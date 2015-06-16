<?php
	include 'conexion.php';
	include 'funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	if($_GET['fun'] == "1"){//para paises
		if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
			$sql = "select id_pais,descripcion from pais";
			cargarSelect($conexion,$sql);
		}else{

		}
	}else{
		if($_GET['fun'] == "2"){//para provincias
			if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
				$sql = "select id_provincia,descripcion from provincia where id_pais = '$_GET[id]'";
				cargarSelect($conexion,$sql);
			}else{

			}
		}else{
			if($_GET['fun'] == "3"){//para ciudades
				if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
					$sql = "select id_ciudad,descripcion from ciudad where id_provincia = '$_GET[id]'";
					cargarSelect($conexion,$sql);
				}else{

				}
			}else{
				if($_GET['fun'] == "4"){//para cargos
					if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
						$sql = "select id_cargo,descripcion from cargo";
						cargarSelect($conexion,$sql);
					}else{

					}
				}else{
					if($_GET['fun'] == "5"){//para pais modificar
						if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
							$sql = "select id_provincia from ciudad where id_ciudad = '$_GET[id]'";							
							id($conexion,$sql);
						}else{

						}
					}else{
						if($_GET['fun'] == "6"){//para pais modificar
							if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
								$sql = "select id_pais from provincia where id_provincia = '$_GET[id]'";															
								id($conexion,$sql);
							}else{
								
							}
						}else{
							if($_GET['fun'] == "7"){//para el producto
								if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
									$sql = "select id_tipo,descripcion from tipo_producto";															
									cargarSelect($conexion,$sql);
								}else{
									
								}
							}else{
								if($_GET['fun'] == "8"){//para la categoria
									if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
										$sql = "select id_categoria,nombre_categoria from categoria";															
										cargarSelect($conexion,$sql);
									}else{
										
									}
								}else{
									if($_GET['fun'] == "9"){//para la categoria
										if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
											$sql = "select id_bodega,nombre_bodega from bodega order by fecha_creacion asc";															
											cargarSelect($conexion,$sql);
										}else{
											
										}
									}else{
										if($_GET['fun'] == "10"){//para la categoria
											if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
												$sql = "select id_marca,nombre_marca from marca";															
												cargarSelect($conexion,$sql);
											}else{
												
											}
										}else{
											if($_GET['fun'] == "11"){//para la categoria
												if($_GET['tipo'] == "0"){//indica que se carga al inicio de la pagina
													$sql = "select id_unidad,descripcion,cantidad from unidades_medida";															
													cargarSelect_1($conexion,$sql);
												}else{
													
												}
											}else{
												if($_GET['fun'] == "12"){//para la busqueda de ci de  proveedores
													if($_GET['tipo'] == "0"){
														$sql = "select id_proveedor,identificacion,nombres_completos from proveedor where identificacion like '%$_GET[val]%'";															
														cargarSelect_1($conexion,$sql);
													}else{

													}
												}else{
													if($_GET['fun'] == "13"){//para la busqueda de clientes identificacion
														if($_GET['tipo'] == "0"){
															$sql = "select id_cliente,identificacion,nombres_completos,direccion,telefono1,correo from cliente where identificacion like '%$_GET[val]%'";															
															cargarSelect_6($conexion,$sql);
														}else{															
														}
													}else{
														if($_GET['fun'] == "14"){//para la busqueda de nombres de proveedor
															if($_GET['tipo'] == "0"){
																$sql = "select id_proveedor,nombres_completos,identificacion from proveedor where nombres_completos like '%$_GET[val]%'";
																cargarSelect_1($conexion,$sql);
															}else{
																
															}
														}
														else{
															if($_GET['fun'] == "15"){//para la busqueda del codigo del producto
																if($_GET['tipo'] == "0"){
																	$sql = "select P.id_productos, P.codigo,codigo_barras, P.descripcion, P.precio_minorista, P.stock, I.porcentaje, P.facturar_existencia, P.incluye_iva, P.descuento from productos P , porcentaje_iva I where P.id_porcentaje_iva = I.id_porcentaje_iva and codigo like '%$_GET[val]%'";																	
																	cargarSelect_10($conexion,$sql);//select de 5 datos
																}else{
																	
																}
															}else{
																if($_GET['fun'] == "16"){//para la busqueda del nombre del producto
																	if($_GET['tipo'] == "0"){
																		$sql = "select id_productos,codigo,codigo_barras,descripcion,precio_minorista,stock,iva_producto,facturar_existencia from productos where descripcion like '%$_GET[val]%'";
																		
																		cargarSelect_8($conexion,$sql);//select de 5 datos
																	}else{
																		
																	}
																}else{
																	if($_GET['fun'] == "17"){//para la busqueda del nombre del producto
																		if($_GET['tipo'] == "0"){
																			$sql = "select productos.id_productos,codigo,descripcion,cantidad,detalle_factura_compra.precio,descuento,total from detalle_factura_compra,productos where detalle_factura_compra.id_productos = productos.id_productos and id_factura_compra = '$_GET[id]'";
																			
																			carga_tabla_7($conexion,$sql);//json de 7 datos
																		}else{
																		
																		}
																	}else{
																		if($_GET['fun'] == "18"){//para la busqueda de clientes
																			if($_GET['tipo'] == "0"){
																				$sql = "select id_cliente,identificacion,nombres_completos,direccion,telefono1,correo from cliente where nombres_completos like '%$_GET[val]%'";															
																				cargarSelect_6($conexion,$sql);
																			}else{															
																			}
																		}else{
																			if($_GET['fun'] == "19"){//para la busqueda del codigo del producto
																				if($_GET['tipo'] == "0"){
																					$sql = "select id_productos,codigo,codigo_barras,descripcion,precio,stock,iva_producto,facturar_existencia from productos where codigo like '%$_GET[val]%'";																	
																					cargarSelect_8($conexion,$sql);//select de 5 datos
																				}else{
																					
																				}
																			}else{
																				if($_GET['fun'] == "20"){//para la busqueda del nombre del producto
																					if($_GET['tipo'] == "0"){
																						$sql = "select id_productos,codigo,codigo_barras,descripcion,precio,stock,iva_producto,facturar_existencia from productos where descripcion like '%$_GET[val]%'";
																						cargarSelect_8($conexion,$sql);//select de 5 datos
																					}else{
																						
																					}
																				}else{
																					if($_GET['fun'] == "21"){//para la busqueda de proveedores por ci con factura
																						if($_GET['tipo'] == "0"){
																							$sql = "select distinct proveedor.id_proveedor,identificacion,nombres_completos from factura_compra,proveedor where factura_compra.id_proveedor = proveedor.id_proveedor and proveedor.id_proveedor like '%$_GET[val]%'";
																							cargarSelect_1($conexion,$sql);//select de 5 datos
																						}else{
																							
																						}
																					}else{
																						if($_GET['fun'] == "22"){//para la busqueda de proveedores por nombres con factura
																							if($_GET['tipo'] == "0"){
																								$sql = "select distinct proveedor.id_proveedor,nombres_completos,identificacion from factura_compra,proveedor where factura_compra.id_proveedor = proveedor.id_proveedor and proveedor.nombres_completos like '%$_GET[val]%'";
																								cargarSelect_1($conexion,$sql);//select de 5 datos
																							}else{
																							
																							}
																						}else{
																							if($_GET['fun'] == "23"){//para la busqueda de proveedores por nombres con factura
																								if($_GET['tipo'] == "0"){
																									$sql = "select  id_factura_compra,numero_serie,id_usuario from factura_compra where id_proveedor = '$_GET[id]' and numero_serie  like '%$_GET[val]%'";																									
																									cargarSelect_1($conexion,$sql);//select de 5 datos
																								}else{
																								
																								}
																							}else{
																								if($_GET['fun'] == "24"){//para la busqueda del codigo del producto
																									if($_GET['tipo'] == "0"){
																										$sql = "select productos.id_productos,codigo,codigo_barras,descripcion,detalle_factura_compra.precio,cantidad,descuento,total from detalle_factura_compra,productos where detalle_factura_compra.id_productos = productos.id_productos and id_factura_compra ='$_GET[id]' and productos.codigo like '%$_GET[val]%'";																	
																										
																										cargarSelect_8($conexion,$sql);//select de 5 datos
																									}else{
																										
																									}
																								}else{
																									if($_GET['fun'] == "25"){//para la busqueda del codigo del producto
																										if($_GET['tipo'] == "0"){
																											$sql = "select productos.id_productos,codigo,codigo_barras,descripcion,detalle_factura_compra.precio,cantidad,descuento,total from detalle_factura_compra,productos where detalle_factura_compra.id_productos = productos.id_productos and id_factura_compra ='$_GET[id]' and productos.descripcion like '%$_GET[val]%'";																	
																											cargarSelect_8($conexion,$sql);//select de 5 datos
																										}else{
																											
																										}
																									}else{
																										if($_GET['fun'] == "26"){//para la busqueda del codigo del producto
																											if($_GET['tipo'] == "0"){
																												$sql = "select id_usuario,identificacion,nombres_completos from usuario where identificacion like '%$_GET[val]%'";																	
																												cargarSelect_1($conexion,$sql);//select de 3 datos
																											}else{
																												
																											}
																										}else{
																											if($_GET['fun'] == "27"){//para la busqueda del codigo del producto
																												if($_GET['tipo'] == "0"){
																													$sql = "select id_usuario,identificacion,nombres_completos from usuario where nombres_completos like '%$_GET[val]%'";																	
																													cargarSelect_1($conexion,$sql);//select de 3 datos
																												}else{
																													
																												}
																											}else{
																												if($_GET['fun'] == "28"){//para la busqueda de formas de pago
																													if($_GET['tipo'] == "0"){
																														$sql = "select id_forma_pago,descripcion from formas_pago order by principal = 'No' asc";
																														cargarSelect($conexion,$sql);//select de 3 datos
																													}else{
																														
																													}
																												}else{
																													if($_GET['fun'] == "29"){//para la busqueda de formas de pago
																														if($_GET['tipo'] == "0"){
																															$sql = "select id_termino_pago,descripcion from terminos_pago order by principal = 'No' asc";
																															cargarSelect($conexion,$sql);//select de 3 datos
																														}else{
																															
																														}
																													}else{
																														if($_GET['fun'] == "30"){//detales de los grupos
																															if($_GET['tipo'] == "0"){
																																$sql = "select cuentas_grupos.id_plan,codigo_cuenta,nombre_cuenta,id from cuentas_grupos,plan_cuentas where cuentas_grupos.id_plan = plan_cuentas.id_plan and cuentas_grupos.id_grupo = '".$_GET['val']."'";
																																buscar_nombres($conexion,$sql);//select de 4 datos
																															}else{
																																
																															}
																														}else{
																															if($_GET['fun'] == "31"){//detales de los grupos
																																if($_GET['tipo'] == "0"){
																																	$sql = "SELECT id_porcentaje_iva, porcentaje  FROM porcentaje_iva order by porcentaje desc ";
																																	cargarSelect($conexion,$sql);//select de 3 datos
																																}else{
																																	
																																}
																															}else{

																															}
													

																														}
																													}
																												}	
																											}	
																										}	
																									}	
																								}
																							}	
																						}	
																					}	
																				}
																			}
																		}
																	}
																}
															}
														}													
													}
												}
											}
										}
									}
								}
							}	
						}	
					}
				}
			}
		}
	}
?>