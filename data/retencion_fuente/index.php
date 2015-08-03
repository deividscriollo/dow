<?php include('../menu/index.php'); ?>
<?php
if(!isset($_SESSION))
	{
		session_start();		
	}
	if(!isset($_SESSION["iddow"])) {

		header('Location: ../../');
	}
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<link rel="shortcut icon" href="../../dist/images/logo.fw.png">
		<title>Inicio - <?php empresa(); ?></title>

		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="../../dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="../../dist/css/font-awesome.min.css" />

		<!-- page specific plugin styles -->
		<link rel="stylesheet" href="../../dist/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../../dist/css/chosen.min.css" />
		<link rel="stylesheet" href="../../dist/css/datepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/colorpicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/fontdc.css" />
		<link rel="stylesheet" href="../../dist/css/ui.jqgrid.min.css" />
		<!-- ace styles -->
		<link rel="stylesheet" href="../../dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link type="text/css" rel="stylesheet" id="ace-skins-stylesheet" href="../../dist/css/ace-skins.min.css">
		<link rel="stylesheet" href="../../dist/css/jquery.gritter.min.css" />
		<!-- ace settings handler -->
		<script src="../../dist/js/ace-extra.min.js"></script>
	</head>

	<body class="skin-1">
		<?php menu_arriba(); ?>
		<div class="main-container" id="main-container">
			<?php menu_lateral(); ?>
			 <div class="main-content">
				<div class="main-content-inner">
					<div class="breadcrumbs" id="breadcrumbs">
                        <script type="text/javascript">
                            try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
                        </script>
                        <ul class="breadcrumb">
                            <li>
                                <i class="ace-icon fa fa-home home-icon"></i>
                                <a href="../inicio/">Inicio</a>
                            </li>
                            <li class="active">Contabilidad</li>
                            <li class="active">Retención en la fuente (Impuesto a la venta)</li>
                        </ul>
                    </div>
					<div class="page-content">
						<div class="row">
							<div class="col-xs-12 col-sm-12 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title">Retención en la fuente</h5>
										<div class="widget-toolbar">
											<a href="#" data-action="fullscreen" class="orange2">
												<i class="ace-icon fa fa-expand"></i>
											</a>
											<a href="#" data-action="reload">
												<i class="ace-icon fa fa-refresh"></i>
											</a>
										</div>
									</div>
									<div class="widget-body">
										<div class="widget-main">
											<div class="row">
												<form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_retencion_fuente">										
													<div class="col-xs-12">
														<div class="col-sm-4">
															<div class="row">
																<div class="col-sm-12">
																	<div class="form-group">
																		<label class="col-sm-4 control-label no-padding-right" for="form-field-1"> Código Anexo:</label>
																		<div class="col-sm-8">
																			<input type="hidden"  id="txt_0" name="txt_0" />
																			<input class="form-control"  type="text" name="txt_1" id="txt_1" placeholder="Código de Cuenta" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9./(), -'']{1,}" autocomplete= 'off' minlength='1' />
																		</div>																													
																	</div>	
																</div>
															</div>															
														</div>
														<div class="col-sm-5">
															<div class="row">
																<div class="col-sm-12">																															
																	<div class="form-group">
																		<label class="col-sm-4 control-label no-padding-right" for="form-field-1">Formulario:</label>
																		<div class="col-sm-8">
																			<input class="form-control"  type="text" name="txt_2" id="txt_2" placeholder="Nro de Formulario" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9./(), -'']{1,}" autocomplete= 'off' minlength='1' />	
																		</div>																													
																	</div>	
																</div>
															</div>																														
														</div>
														<div class="col-sm-3">
															<div class="row">
																<div class="col-sm-12">																															
																	<div class="form-group">
																		<label class="col-sm-5 control-label no-padding-right" for="form-field-1">Porcentaje %:</label>
																		<div class="col-sm-5">
																			<input class="form-control"  type="text" name="txt_3" id="txt_3" placeholder="Porcentaje %" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9./(), -'']{1,}" autocomplete= 'off' minlength='1' onkeydown="return validarNumeros(event)" />	
																		</div>																													
																	</div>	
																</div>
															</div>																														
														</div>
														<div class="col-sm-5">
															<div class="row">
																<div class="col-sm-12">																															
																	<div class="form-group">
																		<label class="col-sm-3 control-label no-padding-right" for="form-field-1">Cuenta Contable:</label>
																		<div class="col-sm-9">
																			<input class="form-control"  type="text" name="txt_4" id="txt_4" placeholder="Cuenta Contable" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9./(), -'']{1,}" autocomplete= 'off' readonly="" minlength='1' />	
																			<input type="hidden" id="txt_00" name="txt_00">
																		</div>																													
																	</div>	
																</div>
															</div>																														
														</div>
														<div class="col-sm-1">
															<div class="row">																																
																<button data-toggle="modal" style="padding-bottom: 1px;padding-top: 2px" href="#myModal" type="button" id="btn_2" class="btn btn-primary"><i class="ace-icon fa fa-search bigger-120 white"></i>
															</div>																														
														</div>
														<div class="col-sm-6">
															<div class="row">
																<div class="col-sm-12">																															
																	<div class="form-group">
																		<label class="col-sm-2 control-label no-padding-right" for="form-field-1">Descripción:</label>
																		<div class="col-sm-10">																			
																			<input class="form-control"  type="text" name="txt_5" id="txt_5" placeholder="Descripción" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9./(), -'']{1,}" autocomplete= 'off' minlength='1' />	
																		</div>																													
																	</div>	
																</div>
															</div>																														
														</div>
														
														<div class="col-sm-12">
															<div class="row">
																<div class="center">													 
																	<button type="submit" class="btn btn-primary" id="btn_0">
																		<i class="ace-icon fa fa-floppy-o bigger-120 write"></i>
																		Guardar
																	</button>
																	<button type="button" id="btn_1" class="btn btn-primary">
																		<i class="ace-icon fa fa-file-o bigger-120 write"></i>
																		Limpiar
																	</button>
																	<button type="button" id="btn_3" class="btn btn-primary">
																		<i class="ace-icon fa fa-refresh bigger-120 write"></i>
																		Actualizar
																	</button>														
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>											
											<div class="row">
												<div class="col-xs-12">
													<div class="clearfix">
														<div class="pull-right tableTools-container"></div>
													</div>
													<div>
														<table id="td_retenciones" class="table table-striped table-bordered table-hover">
															<thead>
																<tr>
																	<th class="hidden">Código</th>
																	<th>Código Anexo</th>
																	<th>Nro. Formulario</th>
																	<th>Porcentaje %</th>
																	<th>Descripción</th>
																	<th class="hidden">id_plan</th>
																	<th>Código Cuenta</th>
																	<th>Nombre Cuenta</th>
																	<th class="hidden">estado</th>
																	<th>Fecha Creación</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>							
						</div>
					</div>
				</div>
			</div>
			<!-- Modal -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			    <div class="modal-dialog">
			     	<div class="modal-content">
			        	<div class="modal-header">
			          		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			          		<h4 class="modal-title">PLAN DE CUENTAS</h4>
			        	</div>
			        	<div class="modal-body">
			            	<table id="table"></table>
							<div id="pager"></div>
			        	</div>
			        	<div class="modal-footer">
			          		<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
			        	</div>
			      	</div><!-- /.modal-content -->
			    </div><!-- /.modal-dialog -->
		  	</div><!-- /.modal -->
			<?php footer(); ?>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div>
		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='../../dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="../../dist/js/bootstrap.min.js"></script>
		<script src="../../dist/js/jquery-ui.custom.min.js"></script>
		<script src="../../dist/js/jquery.ui.touch-punch.min.js"></script>
		<script src="../../dist/js/chosen.jquery.min.js"></script>
		<script src="../../dist/js/fuelux/fuelux.spinner.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-timepicker.min.js"></script>
		<script src="../../dist/js/date-time/moment.min.js"></script>
		<script src="../../dist/js/date-time/daterangepicker.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-datetimepicker.min.js"></script>
		<script src="../../dist/js/bootstrap-colorpicker.min.js"></script>
		<script src="../../dist/js/jquery.knob.min.js"></script>
		<script src="../../dist/js/jquery.autosize.min.js"></script>
		<script src="../../dist/js/jquery.inputlimiter.1.3.1.min.js"></script>
		<script src="../../dist/js/jquery.maskedinput.min.js"></script>
		<script src="../../dist/js/bootstrap-tag.min.js"></script>
		<script src="../../dist/js/dataTables/jquery.dataTables.min.js"></script>
		<script src="../../dist/js/dataTables/jquery.dataTables.bootstrap.min.js"></script>
		<script src="../../dist/js/dataTables/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
		<script src="../../dist/js/dataTables/extensions/ColVis/js/dataTables.colVis.min.js"></script>
		<script src="../../dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../dist/js/jqGrid/i18n/grid.locale-en.js"></script>
   		
		<script src="../../dist/js/jquery.gritter.min.js"></script>

		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>
		<script src="../generales.js"></script>
		<script src="retencion_fuente.js"></script>
		<!-- inline scripts related to this page -->
		<script type="text/javascript">
			$(function(){
				//accion boton Buscar

				// seclect chosen 
				$('.chosen-select').chosen({
					allow_single_deselect:true,
					no_results_text:'No encontrado'		
				});
			// rango de fechas
				$('input[name=date-range-picker]').daterangepicker({
					'applyClass' : 'btn-sm btn-success',
					'cancelClass' : 'btn-sm btn-purple',
					locale: {
						applyLabel: 'Aplicar',
						cancelLabel: 'Cancelar',
					}
				});
			});
		
			jQuery(function($) {
				//initiate dataTables plugin
				var oTable1 = $('#td_retenciones')
				//.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
				.dataTable( {					
					bAutoWidth: false,
					"aoColumns": [
					  { "bSortable": false },null, null,null,null,null,null,null,null,null
					],
					"aaSorting": [],			
					language: {
					    "sProcessing":     "Procesando...",
					    "sLengthMenu":     "Mostrar _MENU_ registros",
					    "sZeroRecords":    "No se encontraron resultados",
					    "sEmptyTable":     "Ningún dato disponible en esta tabla",
					    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
					    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
					    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
					    "sInfoPostFix":    "",
					    "sSearch":         "Buscar: ",
					    "sUrl":            "",
					    "sInfoThousands":  ",",					    
					    "sLoadingRecords": "Cargando...",
					    "oPaginate": {
					        "sFirst":    "Primero",
					        "sLast":     "Último",
					        "sNext":     "Siguiente",
					        "sPrevious": "Anterior"
					    },
					    "oAria": {
					        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
					        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
					    }
					},
					"columnDefs": [
			            {
			                "targets": [ 0 ],
			                "visible": false,	
			                "bVisible":false,			                
			            },			            
			            {
			                "targets": [ 1 ],
			                "visible": true,			                
			            },			            
			            {
			                "targets": [ 2 ],
			                "visible": true,			                
			            },
			            {
			                "targets": [ 3 ],
			                "visible": true,			                
			            },
			            {
			                "targets": [ 4 ],
			                "visible": true,			                
			            },
			            {
			                "targets": [ 5 ],
			                "visible": false,
			                "bVisible":false,			                
			            },			            						
			            {
			                "targets": [ 6 ],
			                "visible": true,			                
			            },			            									            
			            {
			                "targets": [ 7 ],
			                "visible": true,			                
			            },			            									            
						{
			                "targets": [ 8 ],
			                "visible": false,
			                "bVisible":false,			                
			            },			            						
			            {
			                "targets": [ 9 ],
			                "visible": true,			                
			            },			            									            
			        ],
			    } );
				//oTable1.fnAdjustColumnSizing();		
			
				//TableTools settings
				TableTools.classes.container = "btn-group btn-overlap";
				TableTools.classes.print = {
					"body": "DTTT_Print",
					"info": "tableTools-alert gritter-item-wrapper gritter-info gritter-center white",
					"message": "tableTools-print-navbar"
				}
			
				//initiate TableTools extension
				var tableTools_obj = new $.fn.dataTable.TableTools( oTable1, {					 
					"sSwfPath": "../../dist/js/dataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf", //in Ace demo dist will be replaced by correct assets path					
					"sRowSelector": "td:not(:last-child)",
					"sRowSelect": "multi",					
					"fnRowSelected": function(row) {
						//check checkbox when row is selected
						try { $(row).find('input[type=checkbox]').get(0).checked = true }
						catch(e) {}
					},
					"fnRowDeselected": function(row) {
						//uncheck checkbox
						try { $(row).find('input[type=checkbox]').get(0).checked = false }
						catch(e) {}
					},					
					"sSelectedClass": "success",
			        "aButtons": [

						{
							"sExtends": "copy",
							"sToolTip": "Copiar al portapapeles",
							"sButtonClass": "btn btn-white btn-primary btn-bold",
							"sButtonText": "<i class='fa fa-copy bigger-110 pink'></i>",
							"fnComplete": function() {
								this.fnInfo( '<h3 class="no-margin-top smaller">Copiado Tabla</h3>\
									<p>Copiado '+(oTable1.fnSettings().fnRecordsTotal())+' Fila(s) en el Portapapeles.</p>',
									1500
								);
							}
						},
						
						{
							"sExtends": "csv",
							"sToolTip": "Exportar a CSV",
							"mColumns":[1, 2, 3, 4,6,7],
							"sButtonClass": "btn btn-white btn-primary  btn-bold",
							"sButtonText": "<i class='fa fa-file-excel-o bigger-110 green'></i>"
						},
						
						{
							"sExtends": "pdf",
							"sToolTip": "Exportar a PDF",							
							"mColumns":[1, 2, 3, 4, 6, 7],
							"sButtonClass": "btn btn-white btn-primary  btn-bold",
							"sButtonText": "<i class='fa fa-file-pdf-o bigger-110 red'></i>"
						},
						
						{
							"sExtends": "print",
							"sToolTip": "Vista de Impresión",
							"sButtonClass": "btn btn-white btn-primary  btn-bold",
							"sButtonText": "<i class='fa fa-print bigger-110 grey'></i>",
							
							"sMessage": "<div class='navbar navbar-default'><div class='navbar-header pull-left'></div></div>",
							
							"sInfo": "<h3 class='no-margin-top'>Vista Impresión</h3>\
									  <p>Por favor, utilice la función de impresión de su navegador para \
										imprimir esta tabla.\
									  <br />Presione <b>ESCAPE</b> cuando haya terminado.</p>",
						}
			        ]
			    } );
				//we put a container before our table and append TableTools element to it
			    $(tableTools_obj.fnContainer()).appendTo($('.tableTools-container'));
				
				//also add tooltips to table tools buttons
				//addding tooltips directly to "A" buttons results in buttons disappearing (weired! don't know why!)
				//so we add tooltips to the "DIV" child after it becomes inserted
				//flash objects inside table tools buttons are inserted with some delay (100ms) (for some reason)
				setTimeout(function() {
					$(tableTools_obj.fnContainer()).find('a.DTTT_button').each(function() {
						var div = $(this).find('> div');
						if(div.length > 0) div.tooltip({container: 'body'});
						else $(this).tooltip({container: 'body'});
					});
				}, 200);
				
				//ColVis extension
				var colvis = new $.fn.dataTable.ColVis( oTable1, {
					"buttonText": "<i class='fa fa-search'></i>",
					"aiExclude": [0,5,8],
					"bShowAll": true,
					//"bRestore": true,
					"sAlign": "right",
					"fnLabel": function(i, title, th) {
						return $(th).text();//remove icons, etc
					}
				}); 
				
				//style it
				$(colvis.button()).addClass('btn-group').find('button').addClass('btn btn-white btn-info btn-bold')
				
				//and append it to our table tools btn-group, also add tooltip
				$(colvis.button())
				.prependTo('.tableTools-container .btn-group')
				.attr('title', 'Mostrar / ocultar las columnas').tooltip({container: 'body'});
				
				//and make the list, buttons and checkboxed Ace-like
				$(colvis.dom.collection)
				.addClass('dropdown-menu dropdown-light dropdown-caret dropdown-caret-right')
				.find('li').wrapInner('<a href="javascript:void(0)" />') //'A' tag is required for better styling
				.find('input[type=checkbox]').addClass('ace').next().addClass('lbl padding-8');
				
				/////////////////////////////////
				//table checkboxes
				$('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);
				
				//select/deselect all rows according to table header checkbox
				$('#dynamic-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){					
					var th_checked = this.checked;//checkbox inside "TH" table header
					
					$(this).closest('table').find('tbody > tr').each(function(){
						var row = this;
						if(th_checked) tableTools_obj.fnSelect(row);
						else tableTools_obj.fnDeselect(row);
					});
				});
				
				//select/deselect a row when the checkbox is checked/unchecked
				$('#dynamic-table').on('click', 'td input[type=checkbox]' , function(){
					var row = $(this).closest('tr').get(0);					
					if(!this.checked) tableTools_obj.fnSelect(row);
					else tableTools_obj.fnDeselect($(this).closest('tr').get(0));
				});
				
					$(document).on('click', '#dynamic-table .dropdown-toggle', function(e) {						
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
				});
				
				//And for the first simple table, which doesn't have TableTools or dataTables
				//select/deselect all rows according to table header checkbox
				var active_class = 'active';
				$('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){					
					var th_checked = this.checked;//checkbox inside "TH" table header
					
					$(this).closest('table').find('tbody > tr').each(function(){
						var row = this;
						if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
						else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
					});
				});
				
				//select/deselect a row when the checkbox is checked/unchecked
				$('#simple-table').on('click', 'td input[type=checkbox]' , function(){
					var $row = $(this).closest('tr');
					if(this.checked) $row.addClass(active_class);
					else $row.removeClass(active_class);
				});
			
				/********************************/
				//add tooltip for small view action buttons in dropdown menu
				$('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
				
				//tooltip placement on right or left
				function tooltip_placement(context, source) {
					var $source = $(source);
					var $parent = $source.closest('table')
					var off1 = $parent.offset();
					var w1 = $parent.width();
			
					var off2 = $source.offset();
					//var w2 = $source.width();
					if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
					return 'left';
				}
			})
		</script>

		
	</body>
</html>