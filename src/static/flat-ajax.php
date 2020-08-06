<?php
$roomsCount = $_POST['rooms'];
for ($i=0; $i<20; $i++) {?>
    <div class="card fadeIn" style="opacity:0; animation-delay:<?=$i/15;?>s"  onanimationend="this.style.opacity=1">
        <div class="flat-name" >Квартира <?=$roomsCount?>А</div>
        <img class="flat-img" src="./assets/images/choose-flat/15.png" alt="foto"/>
        <div class="card-row"> 
            <span>Будинок: </span>
            <span class="value">15</span>
        </div>
        <div class="card-row"> 
            <span>Загальна площа: </span>
            <span class="value square-metres">15 м<sub>2</sub></span>
        </div>
        <div class="card-row"> 
            <span>Житлова площа:</span>
            <span class="value square-metres">15 м<sub>2</sub></span>
        </div>
        <a class="link blue" href="flat.html">Дивитися планування</a>
    </div>
    <?}
?>