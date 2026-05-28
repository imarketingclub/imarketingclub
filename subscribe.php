<?php
header('Content-Type: application/json');

$API_KEY     = 'shfgo3ma4dsb7umj76u0mvv8c6osqi30';
$CAMPAIGN_ID = '490060604';

function gr($method, $endpoint, $payload = null) {
    global $API_KEY;
    $ch = curl_init('https://api.getresponse.com/v3/' . $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'X-Auth-Token: api-key ' . $API_KEY,
        'Content-Type: application/json'
    ]);
    if ($payload !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    }
    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ['status' => $status, 'body' => json_decode($body, true)];
}

// GET ?campaigns — lists all campaigns so you can find the correct campaignId
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['campaigns'])) {
    $r = gr('GET', 'campaigns?fields=campaignId,name');
    echo json_encode($r);
    exit;
}

// POST — subscribe an email address
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data  = json_decode(file_get_contents('php://input'), true);
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $name  = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');

    if (!$email) {
        http_response_code(400);
        echo json_encode(['error' => 'invalid_email']);
        exit;
    }

    $payload = ['email' => $email, 'campaign' => ['campaignId' => $CAMPAIGN_ID]];
    if ($name !== '') {
        $payload['name'] = $name;
    }

    $r = gr('POST', 'contacts', $payload);
    http_response_code($r['status']);
    echo json_encode($r['body'] ?? []);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'method_not_allowed']);
