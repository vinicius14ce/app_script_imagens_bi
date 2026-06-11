# app_script_imagens_lookerStudio/PowerBI
Script para listar imagens no Drive para publicar em BI - Roda em AppScript

Abra sua planilha no google Sheets, vá em extenções e abra App Script. 

Salve o codigo e defina a constantes de pasta no drive e pagina na planilha. 

function testScan()
** lista todos os ids disponiveis na pasta origem. 

function testCompareIndex()
** lista os ids de testScan() que ainda não estão na tabela destino. 

function updateLinks()
** função completa - compara origem com destino, aplica expressão regular e salva no destino. 

--Utilizar Agendador para continuar o processo apos o timeout.
