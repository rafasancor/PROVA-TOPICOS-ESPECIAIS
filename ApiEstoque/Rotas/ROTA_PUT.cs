using ApiEstoque.Models;
using Microsoft.EntityFrameworkCore; // Adicione esta linha para usar .Entry

namespace ApiEstoque.Routes
{
    public static class ROTA_PUT
    {
        public static void MapPutRoutes(this WebApplication app)
        {
            app.MapPut("/produtos/{id}", async (int id, Produto produtoAtualizado, ProdutoContext context) =>
            {
                var produtoExistente = await context.Produtos.FindAsync(id);

                if (produtoExistente is null)
                {
                    return Results.NotFound();
                }

                // Atualiza as propriedades do produto existente com os valores do produtoAtualizado
                produtoExistente.Nome = produtoAtualizado.Nome;
                produtoExistente.Quantidade = produtoAtualizado.Quantidade;
                produtoExistente.Preco = produtoAtualizado.Preco;
                produtoExistente.Descricao = produtoAtualizado.Descricao;

                await context.SaveChangesAsync();
                return Results.NoContent(); // Retorna 204 No Content para PUT bem-sucedido sem retorno de corpo
            });
        }
    }
}