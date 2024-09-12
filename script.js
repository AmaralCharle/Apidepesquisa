document.getElementById('estado').addEventListener('change', function() {
    const estado = this.value;
    const cidadeSelect = document.getElementById('cidade');
    
    if (estado) {
        // Limpar as opções anteriores e desabilitar o select até o carregamento
        cidadeSelect.innerHTML = '<option value="">Carregando cidades...</option>';
        cidadeSelect.disabled = true;
        
        // Chamar a API para buscar as cidades do estado selecionado
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)  // <-- API correta aqui
            .then(response => response.json())
            .then(data => {
                // Limpar as opções anteriores e adicionar as novas cidades
                cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
                
                data.forEach(cidade => {
                    let option = document.createElement('option');
                    option.value = cidade.nome;  // Nome da cidade
                    option.text = cidade.nome;
                    cidadeSelect.appendChild(option);
                });
                
                // Habilitar o select após o carregamento das cidades
                cidadeSelect.disabled = false;
            })
            .catch(error => {
                console.error('Erro ao buscar cidades:', error);
                cidadeSelect.innerHTML = '<option value="">Erro ao carregar cidades</option>';
            });
    } else {
        cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
        cidadeSelect.disabled = true;
    }
});
