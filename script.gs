const folderId = 'ID da pasta no Drive'
const links = 'Titulo da pagina no Sheets' 


// Função para listar IDs de arquivos em uma pasta específica
function testScan() {
  var folder = DriveApp.getFolderById(folderId); // Acessa a pasta pelo ID
  var files = folder.getFiles(); // Obtém o iterador de todos os arquivos na pasta
  var fileIds = []; // Cria um array vazio para armazenar os IDs extraídos

  while (files.hasNext()) { // Loop enquanto houver arquivos na pasta
    var file = files.next(); // Seleciona o arquivo atual
    var name = file.getName(); // Obtém o nome do arquivo
    
    // Tenta encontrar um número no nome. Se achar, usa o primeiro encontrado; senão, usa "---"
    var id = name.match(/\d+/) ? name.match(/\d+/)[0] : "---";
    
    fileIds.push(id); // Adiciona o ID encontrado ao array
  }
  console.log(fileIds)
  return fileIds; // Retorna o array completo com todos os IDs
}

// Função para comparar IDs do Drive com a planilha "links"
function testCompareIndex() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(links); // Acessa a aba links
  var data = sheet.getDataRange().getValues(); // Obtém todos os dados da tabela
  var existingIds = data.map(function(row) { return String(row[0]); }); // Cria um array apenas com os IDs existentes (coluna A)
  
  var driveIds = scan(folderId); // Chama a função scan e armazena os IDs encontrados
  
  // Filtra o array do drive: retorna apenas os que NÃO estão na coluna de IDs da planilha
  var newIds = driveIds.filter(function(id) {
    return existingIds.indexOf(id) === -1;
  });
  console.log(newIds)
  return newIds; // Retorna apenas os IDs que são novos
}



function updateLinks() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(links);
  var folder = DriveApp.getFolderById(folderId);
  
  // 1. Pega IDs da planilha de uma vez
  var data = sheet.getDataRange().getValues();
  var existingIds = data.map(function(row) { return String(row[0]); });
  
  // 2. Pega todos os arquivos da pasta de uma vez (em vez de buscar um por um)
  var files = folder.getFiles();
  
  // 3. Processa tudo em um único loop
  while (files.hasNext()) {
    var file = files.next();
    var name = file.getName();
    var id = name.match(/\d+/) ? name.match(/\d+/)[0] : "---";
    var fileId = file.getId();
    var customUrl = "https://drive.google.com/thumbnail?id=" + fileId;


    // Se o ID ainda não está na planilha, adiciona
    if (existingIds.indexOf(id) === -1) {
      
      sheet.appendRow([id, customUrl]);
      existingIds.push(id); // Atualiza a lista local para evitar duplicatas na mesma execução
    }
  }
}
