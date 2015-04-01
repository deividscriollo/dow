<?php
include '../data/conexion.php';
$conexion = conectarse();
	if(!isset($_SESSION)){
		session_start();		
	}


	if (isset($_POST['g'])) {
		$user = $_POST['txt_1'];
		$pass = $_POST['txt_2'];		
		$acu=0;				
		$result = pg_query("SELECT * FROM USUARIO U, CLAVES C WHERE U.ID_USUARIO=C.ID_USUARIO AND U.USUARIO='$user' AND C.CLAVE=md5('$pass');");
		while ($row = pg_fetch_row($result)) {			
			$_SESSION['iddow']=$row[0];
			$_SESSION['niveldow']=$row[9];
			$_SESSION['nombrescompletosdow']=$row[2];
			$_SESSION['usuariodow']=$row[8];			
			$acu=1;
		}
		$result = pg_query("select nivel1,nivel2,nivel3 from permisos where id_usuario = '".$_SESSION['iddow']."'");
		while ($row = pg_fetch_row($result)) {			
			$_SESSION['nivel1']=$row[0];
			$_SESSION['nivel2']=$row[1];
			$_SESSION['nivel3']=$row[2];						
		}

		$_SESSION['nivel1'] = str_replace("{", "", $_SESSION['nivel1']);
		$_SESSION['nivel1'] = str_replace("}", "", $_SESSION['nivel1']);		
		$_SESSION['nivel1'] = explode(",", $_SESSION['nivel1']);
		$_SESSION['nivel2'] = str_replace("{", "", $_SESSION['nivel2']);
		$_SESSION['nivel2'] = str_replace("}", "", $_SESSION['nivel2']);		
		$_SESSION['nivel2'] = explode(",", $_SESSION['nivel2']);
		$_SESSION['nivel3'] = str_replace("{", "", $_SESSION['nivel3']);
		$_SESSION['nivel3'] = str_replace("}", "", $_SESSION['nivel3']);		
		$_SESSION['nivel3'] = explode(",", $_SESSION['nivel3']);		
		
		$_SESSION['empresa_dow']="09594354b7d5df18f18";//en caso de multiempresa modificar este parametro asesor legal cambiado por fecha autorizacion
		$_SESSION['nombre_empresa_dow']="TOTORA SISA";
		if ($acu==0) {
			print(0);
		}else print(1);
	}

?>