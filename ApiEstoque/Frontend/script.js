const API_URL = "http://localhost:5139/produtos";

// Função para buscar e exibir produtos
async function fetchProdutos() {
    try {
        const response = await fetch(API_URL); //
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const produtos = await response.json(); //
        const tabelaCorpo = document.querySelector("#tabela-produtos tbody");
        if (tabelaCorpo) {
            tabelaCorpo.innerHTML = "";
            produtos.forEach(produto => {
                const row = tabelaCorpo.insertRow();
                row.insertCell().textContent = produto.id;
                row.insertCell().textContent = produto.nome;
                row.insertCell().textContent = produto.quantidade;
                row.insertCell().textContent = `R$ ${produto.preco.toFixed(2)}`;
                row.insertCell().textContent = produto.descricao || "N/A";
                const acoesCell = row.insertCell();
                acoesCell.className = "acoes-buttons";

                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.className = "editar";
                btnEditar.onclick = () => openEditModal(produto);
                acoesCell.appendChild(btnEditar);

                const btnExcluir = document.createElement("button");
                btnExcluir.textContent = "Excluir";
                btnExcluir.className = "excluir";
                btnExcluir.onclick = () => deleteProduto(produto.id); //
                acoesCell.appendChild(btnExcluir);
            });
        }
        // Chamadas para funções de relatório, se estiver na página de relatório
        if (document.getElementById("relatorio-estoque")) {
            calcularValorTotalEstoque(produtos);
            listarProdutosBaixoEstoque(produtos);
        }

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        const tabelaCorpo = document.querySelector("#tabela-produtos tbody");
        if (tabelaCorpo) {
            tabelaCorpo.innerHTML = `<tr><td colspan="6">Erro ao carregar produtos. ${error.message}</td></tr>`;
        }
    }
}

// Função para abrir o modal de edição
function openEditModal(produto) {
    const modal = document.getElementById("modal-edicao");
    document.getElementById("edit-id").value = produto.id;
    document.getElementById("edit-nome").value = produto.nome;
    document.getElementById("edit-quantidade").value = produto.quantidade;
    document.getElementById("edit-preco").value = produto.preco;
    document.getElementById("edit-descricao").value = produto.descricao || "";
    modal.style.display = "block";
}

// Função para fechar o modal
function closeEditModal() {
    const modal = document.getElementById("modal-edicao");
    modal.style.display = "none";
}

// Event listener para fechar o modal ao clicar no 'x'
document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".close-button");
    if (closeButton) {
        closeButton.onclick = closeEditModal;
    }

    // Fechar o modal clicando fora dele
    window.onclick = function(event) {
        const modal = document.getElementById("modal-edicao");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


// Função para enviar os dados de edição (PUT)
async function updateProduto(event) {
    event.preventDefault();
    const id = document.getElementById("edit-id").value;
    const produtoAtualizado = {
        id: parseInt(id),
        nome: document.getElementById("edit-nome").value,
        quantidade: parseInt(document.getElementById("edit-quantidade").value),
        preco: parseFloat(document.getElementById("edit-preco").value),
        descricao: document.getElementById("edit-descricao").value
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, { //
            method: "PUT", //
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produtoAtualizado)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Produto atualizado com sucesso!");
        closeEditModal();
        fetchProdutos(); // Recarrega a lista de produtos
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert(`Erro ao atualizar produto: ${error.message}`);
    }
}


// Função para cadastrar um novo produto (POST)
async function cadastrarProduto(event) {
    event.preventDefault();
    const mensagemCadastro = document.getElementById("mensagem-cadastro");
    mensagemCadastro.textContent = "";

    const novoProduto = {
        nome: document.getElementById("nome").value,
        quantidade: parseInt(document.getElementById("quantidade").value),
        preco: parseFloat(document.getElementById("preco").value),
        descricao: document.getElementById("descricao").value
    };

    try {
        const response = await fetch(API_URL, { //
            method: "POST", //
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoProduto)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const produtoCriado = await response.json(); 
        mensagemCadastro.textContent = `Produto "${produtoCriado.nome}" cadastrado com sucesso! ID: ${produtoCriado.id}`;
        document.getElementById("form-cadastro").reset();
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        mensagemCadastro.textContent = `Erro ao cadastrar produto: ${error.message}`;
    }
}

// Função para deletar um produto (DELETE)
async function deleteProduto(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Produto excluído com sucesso!");
        fetchProdutos(); // Recarrega a lista de produtos
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert(`Erro ao excluir produto: ${error.message}`);
    }
}

// Funções para a tela de relatório
function calcularValorTotalEstoque(produtos) {
    const totalValorSpan = document.getElementById("total-valor");
    if (totalValorSpan) {
        const total = produtos.reduce((sum, produto) => sum + (produto.quantidade * produto.preco), 0);
        totalValorSpan.textContent = `R$ ${total.toFixed(2)}`;
    }
}

function listarProdutosBaixoEstoque(produtos) {
    const listaBaixoEstoque = document.getElementById("lista-baixo-estoque");
    if (listaBaixoEstoque) {
        listaBaixoEstoque.innerHTML = ""; // Limpa a lista
        const produtosBaixoEstoque = produtos.filter(produto => produto.quantidade < 10); // Problema: Quantidade < 10
        if (produtosBaixoEstoque.length > 0) {
            produtosBaixoEstoque.forEach(produto => {
                const li = document.createElement("li");
                li.textContent = `${produto.nome} (ID: ${produto.id}, Quantidade: ${produto.quantidade})`;
                listaBaixoEstoque.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "Nenhum produto com baixo estoque.";
            listaBaixoEstoque.appendChild(li);
        }
    }
}


// Carrega os produtos ao carregar a página (para index.html e relatorio.html)
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tabela-produtos") || document.getElementById("relatorio-estoque")) {
        fetchProdutos();
    }

    // Adiciona o event listener para o formulário de cadastro (apenas em cadastro.html)
    const formCadastro = document.getElementById("form-cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", cadastrarProduto);
    }

    // Adiciona o event listener para o formulário de edição (apenas em index.html)
    const formEdicao = document.getElementById("form-edicao");
    if (formEdicao) {
        formEdicao.addEventListener("submit", updateProduto);
    }
});