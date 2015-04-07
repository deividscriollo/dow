<?php
//verificacion si esta iniciada la variable se ssesion 
//error_reporting(0);
		if(!isset($_SESSION))
	{
		session_start();		
	}
	if(!isset($_SESSION["iddow"])) {

		header('Location: ../../');
	}
//informacion empresa
function empresa(){
	print $_SESSION['nombre_empresa_dow'];
}
//Menu banner arriba usuario perfil dependientes del nivel de usuario
function menu_arriba(){	
	print'
	<div id="navbar" class="navbar navbar-default">
			<script type="text/javascript">
				try{ace.settings.check("navbar" , "fixed")}catch(e){}
			</script>

			<div class="navbar-container" id="navbar-container">
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span>

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>
				</button>

				<div class="navbar-header pull-left">
					<a href="#" class="navbar-brand">
						<small>
							';print empresa(); print'
						</small>
					</a>
				</div>

				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">
						<li class="light-blue">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle">
								<img class="nav-user-photo" src="../../dist/avatars/user.jpg" alt="'.$_SESSION['nombrescompletosdow'].'" />
								<span class="user-info">
									<small>Bienvenido,</small>
									'.$_SESSION['nombrescompletosdow'].'
								</span>

								<i class="ace-icon fa fa-caret-down"></i>
							</a>

							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a href="#">
										<i class="ace-icon fa fa-cog"></i>
										Configuración
									</a>
								</li>

								<li>
									<a href="profile.html">
										<i class="ace-icon fa fa-user"></i>
										Perfil
									</a>
								</li>

								<li class="divider"></li>

								<li>
									<a href="../salir/">
										<i class="ace-icon fa fa-power-off"></i>
										Salir
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!-- /.navbar-container -->
		</div>'
	;
}
//Menu Latera perfil aplicacion
function menu_lateral(){	
	error_reporting(0);
	$url = $_SERVER['PHP_SELF'];
	$acus = parse_url($url, PHP_URL_PATH);
	$acus = split ('/', $acus);
	
	print'<div id="sidebar" class="sidebar responsive">
		<script type="text/javascript">
			try{ace.settings.check("sidebar" , "fixed")}catch(e){}
		</script>
	<ul class="nav nav-list">';	
	print '<li>
		<a href="../inicio/">
			<i class="menu-icon fa fa-home"></i>
			<span class="menu-text"> Inicio </span>
		</a>
		<b class="arrow"></b>
	</li>';		
	print '<li ';if ($acus[3]=='categorias' || $acus[3]=='bodegas' || $acus[3]=='clientes' || $acus[3]=='marcas' || $acus[3]=='unidad_medida'|| $acus[3]=='usuario'|| $acus[3]=='empresa'|| $acus[3]=='tipo_producto'|| $acus[3]=='proveedores'|| $acus[3]=='productos') {
		print('class="active open"');
	}print'>
	<a href="#" class="dropdown-toggle">
		<i class="menu-icon fa fa-desktop"></i>
		<span class="menu-text">
			Ingresos
		</span>
		<b class="arrow fa fa-angle-down red"></b>
	</a>
	<b class="arrow"></b>';
	print'<ul class="submenu">
		<li ';if ($acus[3]=='bodegas'||$acus[3]=='categorias'||$acus[3]=='marcas'||$acus[3]=='unidad_medida'||$acus[3]=='tipo_producto') {
			print('class="active open"');
		}print'>';			
			echo '<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-caret-right"></i>
				Generales
				<b class="arrow fa fa-angle-down"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';				
				print '<li ';if ($acus[3]=='bodegas') {
					print('class="active"');
				}print'>
					<a href="../bodegas/">
						<i class="menu-icon fa fa-caret-right"></i>
						Bodegas
					</a>
					<b class="arrow"></b>
				</li>';
									
				print '<li ';if ($acus[3]=='categorias') {
					print('class="active"');
				}print'>
					<a href="../categorias/">
						<i class="menu-icon fa fa-caret-right"></i>
						Categorías
					</a>
					<b class="arrow"></b>
				</li>';
									
				print '<li ';if ($acus[3]=='marcas') {
					print('class="active"');
				}print'>
					<a href="../marcas/">
						<i class="menu-icon fa fa-caret-right"></i>
						Marcas
					</a>
					<b class="arrow"></b>
				</li>';
									
				print '<li ';if ($acus[3]=='unidad_medida') {
					print('class="active"');
				}print'>
					<a href="../unidad_medida/">
						<i class="menu-icon fa fa-caret-right"></i>
						Unidades de Medida
					</a>
					<b class="arrow"></b>
				</li>';
								
				print '<li ';if ($acus[3]=='tipo_producto') {
					print('class="active"');
				}print'>
					<a href="../tipo_producto/">
						<i class="menu-icon fa fa-caret-right"></i>
						Tipo de producto
					</a>
					<b class="arrow"></b>
				</li>';					
				print '<li ';if ($acus[3]=='formas_pago') {
					print('class="active"');
				}print'>
					<a href="../formas_pago/">
						<i class="menu-icon fa fa-caret-right"></i>
						Formas de pago
					</a>
					<b class="arrow"></b>
				</li>';				
				print '<li ';if ($acus[3]=='terminos_pago') {
					print('class="active"');
				}print'>
					<a href="../terminos_pago/">
						<i class="menu-icon fa fa-caret-right"></i>
						Términos de pago
					</a>
					<b class="arrow"></b>
				</li>';				
			print '</ul>
		</li>';
					
		print '<li ';if ($acus[3]=='empresa') {
			print('class="active"');
		}print'>
			<a href="../empresa/">
				<i class="menu-icon fa fa-caret-right"></i>
				Empresa
			</a>
			<b class="arrow"></b>
		</li>';	
						
		print '<li ';if ($acus[3]=='usuario') {
			print('class="active"');
		}print'>
			<a href="../usuario/">
				<i class="menu-icon fa fa-caret-right"></i>
				Usuario
			</a>
			<b class="arrow"></b>
		</li>';
						
		print '<li ';if ($acus[3]=='clientes') {
			print('class="active"');
		}print'>
			<a href="../clientes/">
				<i class="menu-icon fa fa-caret-right"></i>
				Clientes
			</a>
			<b class="arrow"></b>
		</li>';
			
			
		print '<li ';if ($acus[3]=='proveedores') {
			print('class="active"');
		}print'>
			<a href="../proveedores/">
				<i class="menu-icon fa fa-caret-right"></i>
				Proveedores
			</a>
			<b class="arrow"></b>
		</li>';
								
			print '<li ';if ($acus[3]=='productos') {
				print('class="active"');
			}print'>
				<a href="../productos/">
					<i class="menu-icon fa fa-caret-right"></i>
					Productos
				</a>
				<b class="arrow"></b>
			</li>';						
			print '</ul>
		</li>';
		
		print '<li ';if ($acus[3]=='factura_compra' || $acus[3]=='devolucion_compra' || $acus[3]=='factura_venta'|| $acus[3]=='nota_credito'|| $acus[3]=='kardex'|| $acus[3]=='inventario' ) {
			print('class="active open"');
			}print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-cubes ranger"></i>
				<span class="menu-text">
					Procesos
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			
			print '<li ';if ($acus[3]=='inventario') {
				print('class="active"');
				}print'>
				<a href="../inventario/">
					<i class="menu-icon fa fa-caret-right"></i>
					Inventario
				</a>
				<b class="arrow"></b>
			</li>';						
			print '<li ';if ($acus[3]=='factura_compra'||$acus[3]=='devolucion_compra') {
				print('class="active open"');
				}print'>
				<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Compras
					<b class="arrow fa fa-angle-down"></b>
				</a>
				<b class="arrow"></b>
				<ul class="submenu">';					
				print '<li ';if ($acus[3]=='factura_compra') {
				print('class="active"');
				}print'>
					<a href="../factura_compra/">
						<i class="menu-icon fa fa-caret-right"></i>
						Productos Bodega
					</a>
					<b class="arrow"></b>
				</li>';									
				print '<li ';if ($acus[3]=='devolucion_compra') {
					print('class="active"');
				}print'>
					<a href="../devolucion_compra/">
						<i class="menu-icon fa fa-caret-right"></i>
						Devolución Compras
					</a>
					<b class="arrow"></b>
				</li>';										
				print '</ul>
			</li>';						
			print '<li ';if ($acus[3]=='factura_venta'||$acus[3]=='nota_credito') {
			print('class="active open"');
			}print'>
				<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Ventas
					<b class="arrow fa fa-angle-down"></b>
				</a>
				<b class="arrow"></b>
				<ul class="submenu">';					
				print '<li ';if ($acus[3]=='factura_venta') {
				print('class="active"');
				}print'>
					<a href="../factura_venta/">
						<i class="menu-icon fa fa-caret-right"></i>
						Ventas Facturación
					</a>
					<b class="arrow"></b>
				</li>';																													
				print '</ul>
			</li>';												
			print '<li ';if ($acus[3]=='kardex') {
				print('class="active"');
			}print'>
				<a href="../kardex/">
					<i class="menu-icon fa fa-caret-right"></i>
					Kardex
				</a>
				<b class="arrow"></b>
			</li>';															
		print '</ul>
		</li>';
		
		print '<li ';if ($acus[3]=='r_estadistico' || $acus[3]=='r_simple') {
		print('class="active open"');
		}print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-print ranger"></i>
				<span class="menu-text">
					Reportes
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			
			print '<li ';if ($acus[3]=='r_estadistico') {
				print('class="active"');
			}print'>
				<a href="../r_estadistico/">
					<i class="menu-icon fa fa-caret-right"></i>
					Estadisticos
				</a>
				<b class="arrow"></b>
			</li>';					
			print '<li ';if ($acus[3]=='r_simple') {
				print('class="active"');
				}print'>
				<a href="../r_simple/">
					<i class="menu-icon fa fa-caret-right"></i>
					Simples
				</a>
				<b class="arrow"></b>
			</li>';			
			print '</ul>
		</li>';			
	
		print '<li ';if ($acus[3]=='privilegios') {
		print('class="active open"');
		}print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-user"></i>
				<span class="menu-text">
					Parametros
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			
			print '<li ';if ($acus[3]=='privilegios') {				
				print('class="active"');
			}print'>
				<a href="../privilegios/">
					<i class="menu-icon fa fa-caret-right"></i>
					Privilegios
				</a>
				<b class="arrow"></b>
			</li>';

						
			print '</ul>
		</li>';		
	
	print '</ul><!-- /.nav-list -->
		<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
			<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
		</div>
		<script type="text/javascript">
			try{ace.settings.check("sidebar" , "collapsed")}catch(e){}
		</script>
	</div>
	';
}
//pie de Pagina Footer proceso desarrolladores empresa y datos adicionales de la misma
function footer(){
	print'<div class="footer">
		<div class="footer-inner">
			<div class="footer-content">
				<span class="bigger-120">
				<span class="blue bolder">TOTORA SISA</span>
				Aplicación web facturación electronica &copy; 2014-2015
				</span>
				&nbsp; &nbsp;
				<span class="action-buttons">
				<a href="#">
					<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
				</a>
				<a href="#">
					<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
				</a>
				<a href="#">
					<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
				</a>
				</span>
			</div>
		</div>
	</div>';
} 

?>
