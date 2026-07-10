<?php
/**
 * Elart Cleaning — Telegram lead relay (server-side, token stays here).
 *
 * The website (static export) POSTs JSON lead data to this file; we format a
 * clean message and forward it to the Telegram group. The bot token never
 * reaches the browser. This file is gitignored — keep it out of the public repo.
 */

header('Content-Type: application/json; charset=utf-8');

// ─── Config ──────────────────────────────────────────────────────────────────
$BOT_TOKEN = 'PASTE_YOUR_BOT_TOKEN_HERE';
$CHAT_ID   = 'PASTE_YOUR_CHAT_ID_HERE';
// ─────────────────────────────────────────────────────────────────────────────

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: bots fill hidden fields. Pretend success and drop silently.
if (!empty($data['company']) || !empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function field($data, $key, $max = 1000) {
    $v = isset($data[$key]) ? $data[$key] : '';
    if (is_array($v)) {
        $v = implode(', ', $v);
    }
    $v = trim(strip_tags((string) $v));
    if (mb_strlen($v) > $max) {
        $v = mb_substr($v, 0, $max) . '…';
    }
    return $v;
}
function esc($s) {
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

$name    = field($data, 'name', 120);
$phone   = field($data, 'phone', 40);
$email   = field($data, 'email', 160);
$service = field($data, 'service', 160);
$object  = field($data, 'object', 160);
$area    = field($data, 'area', 80);
$timing  = field($data, 'timing', 120);
$extras  = field($data, 'extras', 400);
$message = field($data, 'message', 1500);
$source  = field($data, 'source', 80);

// Need at least a phone or a name to be a real lead.
if ($name === '' && $phone === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'empty']);
    exit;
}

// Clickable call / WhatsApp links built from the phone number.
$telDigits = preg_replace('/[^0-9+]/', '', $phone);
$waDigits  = preg_replace('/[^0-9]/', '', $phone);

if (function_exists('date_default_timezone_set')) {
    date_default_timezone_set('Europe/Warsaw');
}
$stamp = date('d.m.Y · H:i');

// ─── Build the message (Telegram HTML) ───────────────────────────────────────
$lines = [];
$lines[] = '🔔 <b>NOWE ZGŁOSZENIE</b> — Elart Cleaning';
if ($source !== '') {
    $lines[] = '📍 <i>' . esc($source) . '</i>';
}
$lines[] = '━━━━━━━━━━━━━━━━━━━━';

if ($name !== '') {
    $lines[] = '👤 <b>Klient:</b> ' . esc($name);
}
if ($phone !== '') {
    $lines[] = '📞 <b>Telefon:</b> <a href="tel:' . esc($telDigits) . '"><b>' . esc($phone) . '</b></a>';
    if ($waDigits !== '') {
        $lines[] = '💬 <a href="https://wa.me/' . esc($waDigits) . '">Napisz na WhatsApp</a>';
    }
}
$lines[] = '━━━━━━━━━━━━━━━━━━━━';

if ($service !== '') { $lines[] = '🧹 <b>Usługa:</b> ' . esc($service); }
if ($object  !== '') { $lines[] = '🏠 <b>Obiekt:</b> ' . esc($object); }
if ($area    !== '') { $lines[] = '📐 <b>Powierzchnia / zakres:</b> ' . esc($area); }
if ($timing  !== '') { $lines[] = '🗓 <b>Termin:</b> ' . esc($timing); }
if ($extras  !== '') { $lines[] = '➕ <b>Dodatki:</b> ' . esc($extras); }
if ($email   !== '') { $lines[] = '✉️ <b>Email:</b> ' . esc($email); }
if ($message !== '') { $lines[] = "\n📝 <b>Wiadomość:</b>\n" . esc($message); }

$lines[] = "\n🕐 <i>" . esc($stamp) . '</i>';

$text = implode("\n", $lines);

// Inline button → one-tap WhatsApp (tel: isn't allowed in inline buttons).
$replyMarkup = null;
if ($waDigits !== '') {
    $replyMarkup = json_encode([
        'inline_keyboard' => [[
            ['text' => '💬 Napisz na WhatsApp', 'url' => 'https://wa.me/' . $waDigits],
        ]],
    ]);
}

$payload = [
    'chat_id'                  => $CHAT_ID,
    'text'                     => $text,
    'parse_mode'               => 'HTML',
    'disable_web_page_preview' => true,
];
if ($replyMarkup) {
    $payload['reply_markup'] = $replyMarkup;
}

$url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";

// Send (cURL preferred, stream fallback).
$response = false;
if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_TIMEOUT        => 15,
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
} else {
    $ctx = stream_context_create([
        'http' => [
            'method'        => 'POST',
            'header'        => 'Content-Type: application/x-www-form-urlencoded',
            'content'       => http_build_query($payload),
            'timeout'       => 15,
            'ignore_errors' => true,
        ],
    ]);
    $response = @file_get_contents($url, false, $ctx);
}

$result = json_decode((string) $response, true);
if (is_array($result) && !empty($result['ok'])) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'telegram_failed']);
}
