<?php
header('Content-Type: text/html; charset=utf-8');
require 'config.php';
require 'AmoRequest.php';
$obj = new AmoRequest($login, $domain, $api);

$user_name = isset($_POST['name']) ? $_POST['name'] : 'Без имени';
$user_phone = isset($_POST['tel']) ? $_POST['tel'] : '';
$user_mes = isset($_POST['time']) ? $_POST['time'] : 'Зателефонуйте зараз';
//$user_mail = isset($_POST['email']) ? $_POST['email'] : '';

$user_phone = substr(preg_replace("/[^0-9]/ui", "", $user_phone), -16);
//$rt = $obj ->get_request('account?with=custom_fields&');
//$obj -> prn($rt);
//exit();
//ищем по телефону
if(isset($user_phone)){
    $contacts = $obj -> get_request('contacts?query=' . $user_phone . '&');
    //$obj -> prn($contacts);
    if(count($contacts['_embedded']['items']) > 0){
        foreach($contacts['_embedded']['items'] as $oneContact){
            foreach($oneContact['custom_fields'] as $fieldCont){
                if((int)$fieldCont['id'] == $fieldTelContact && stripos(substr(preg_replace("/[^0-9]/ui", "", $fieldCont['values'][0]['value']), -16), $user_phone) !== false){
                    $lastContact = $oneContact['id'];
                    $lastLeads = $oneContact['leads']['id'];
                    $log[] = 'Найден контакт (' . $lastContact . ') по phone (' . $user_phone . ')';
                    $log[] = $lastLeads;
                    break 2;
                }
            }

        }
    }
}
//создаём сделку
$arrAddLead["add"] = array(array("name" => "Заявка из riverside1/",
                                 "created_at" => time(),
                                 "status_id" => $statusToAdd,
                                 "responsible_user_id" => $responsibleUser));

$mod_1 = $obj -> get_request_array('leads?', $arrAddLead);
//создаём примечание к сделке
$arrAddNotes["add"] = array(array("created_at" => time(),
                                "element_id" => (string)$mod_1['_embedded']['items'][0]['id'],
                                "text" => "Бажаний час - " . '"' . $user_mes . '"' . "\r\n",
                                "element_type" => '2',
                                "note_type" => '4'));
$mod_2 = $obj -> get_request_array('notes?', $arrAddNotes);


//если контакт есть, то добавляем к его сделкам только что созданную
if(isset($lastLeads)){
    $lastLeads[] = $mod_1['_embedded']['items'][0]['id'];
    $obj -> prn($lastLeads);
    $contUpOld['update'] = array(array('id' => $lastContact,
                                        'updated_at' => time(),
                                        'leads_id' => $lastLeads));

    $udateOldCont = $obj -> get_request_array('contacts?', $contUpOld);
}
else{
    //если нет то создаём контакт с прикреплением только что созданной сделки
    $contUpOld['add'] = array(array('name' => $user_name,
                                    'created_at' => time(),
                                    'leads_id' => [$mod_1['_embedded']['items'][0]['id']],
                                    'custom_fields' => array(array('id' => $fieldTelContact,
                                                                   'values' => array(array('value' => $user_phone,
'enum' => 'WORK'))),
//                                                             array('id' => $fieldMailContact,
//                                                                   'values' => array(array('value' => $user_mail,
//                                                                                           'enum' => 'WORK'))),
                                            )));
    $udateOldCont = $obj -> get_request_array('contacts?', $contUpOld);

}
//Код который нужно вставить в обработчик формы.
/*
$request["name"] = $_POST['name'];
$request["tel"] = $_POST['tel'];
$request["time"] = $_POST['time'];

$context = stream_context_create(array(
        'http' => array(
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => http_build_query($request)
        )
    ));
$res_amo = file_get_contents("https://crm-tech.space/crm/freelance/amo_site/script.php", false, $context);

 */
?>