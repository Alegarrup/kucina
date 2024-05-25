<?php

    try {

        $bd = new PDO("mysql:host=localhost;dbname=kucina", "dwes", "abc123");
       
    } catch (PDOException $e) {
        echo "<p>No se pudo conectar a la base de datos: " . $e->getMessage() . "</p>\n";
        exit();
    }