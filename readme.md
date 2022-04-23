# Chef Minute

#### Autor: Richard Nikolas Chaves

---

Esta aplicação será voltada para o setor pessoal e gastronômico. O objetivo dela é ser um aplicativo simples e intuitivo para salvar receitas (ingredientes, descrição passo a passo, nível de dificuldade, tempo médio, etc).
Haverão funcionalidades de filtrar as receitas salvas por nome, por categoria ou por cozinha (brasileira, japonesa, etc) e também será possível favoritar receitas.

## 1. Interfaces

#### - Splash Screen (Tela 1)

A _Splash Screen_ é uma tela de abertura padrão do Android, amplamente usado em apps, com o simples objetivo de mostrar/apresentar a logo da empresa ou do aplicativo em questão. Em alguns casos é mostrado também a versão do aplicativo. Também é útil para fazer algum tipo de pré-processamento antes do aplicativo abrir de fato.

#### - Sign Up Screen (Tela 2)

A _Sign Up Screen_ (Tela de Cadastro) será exibida na primeira vez que o usuário utilizar o aplicativo. Aqui são coletados alguns dados básicos do usuário que serão utilizados posteriormente no aplicativo. Os campos requeridos são: Nome, Email, Nível do Chef (amador, mediano, expert, mestre) e Cozinha Favorita (brasileira, italiana, etc). O botão **Get started** levará o usuário para a _Home Screen_.

#### - Home Screen (Tela 3)

A _Home screen_ é a tela principal da aplicação.

-   Primeiramente temos uma saudação pro usuário, uma frase de introdução e um botão em forma de ícone para acessar o perfil do usuário (que ainda não foi desenvolvido).
-   Logo abaixo temos a barra de pesquisa onde será possível filtrar as receitas salvas por nome. (Os outros filtros como "categoria" e "dificuldade" ainda não foram desenvolvidos)
-   A próxima sessão é a parte principal da aplicação, onde são mostrados cards de todas as receitas salvas pelo usuário com as informações de: nome, tempo de preparo, dificuldade, foto e um coração indicando se é favorita ou não. Clicando no card o usuário é redirecionado para a "Recipe Screen" daquela determinada receita.
-   Ao final da tela é encontrado o botão de criar nova receita (+). Este botão redireciona o usuário para a "New Recipe Screen".

#### - Recipe Screen (Tela 4)

A _Recipe Screen_ é onde o usuário vai encontrar todas as informações sobre uma determina receita (filtrada por id, que está na URL). Aqui encontramos, em ordem de cima pra baixo:

-   Botão de retornar para a _Home Screen_ (<-)
-   Botão para favoritar a receita (<3)
-   Foto
-   Nome
-   Breve descrição
-   Tempo de preparo
-   Nota (de 1 a 5)
-   Dificuldade
-   Dois botões para alternar entre Ingredientes e Direções (passo a passo)
-   Lista de ingredientes
-   Passo a passo de como cozinhar a refeição

#### - New Recipe Screen (Tela 5)

A _New Recipe Screen_ é onde o usuário poderá criar uma nova receita. Os campos são:

-   Nome\*
-   Breve descrição
-   URL (link) para a foto ou representação da receita
-   Dificuldade\*
-   Tempo de preparo\*
-   Nota\*
-   Ingredientes\* (no mínimo 1)
-   Direções\* (no mínimo 1)
    **OBS:** todos os campos marcados com (\*) são obrigatórios

No final da tela existe o botão **Create** que valida os campos e, caso eles sejam válidos, cria a receita no banco de dados (IndexedDb) e redireciona o usuário de volta à _Home Screen_.

## 2. Dados do usuário

Minha aplicação utilizará alguns dados do usuário:

-   **Nome** e **email** identificação simples e tratamento mais customizado
-   **Chef Level** para customizar o nível de dificuldade de cada receita
-   **Favorite Cuisine** para criar abas customizadas com o tipo de cozinha escolhida (e talvez recomendar receitas no futuro)
-   **Receitas** são a parte principal da aplicação. O usuário poderá criá-las com a quantidade de ingredientes e passos/direções que quiser, escolher nível de dificuldade, tempo de preparo, colocar um link para a foto da receita (ou representação) e favoritar a receita. Tudo isso será usado para visualização das receitas na Home Screen e Recipe Screen, para diversos filtros que podem ser criados de acordo com as receitas existentes (as receitas são salvas no IndexedDb).

---

## 3. Checklist de implementação

> A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente?

Sim.

> A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes?

Sim.

> A aplicação armazena e usa de forma relevante dados complexos do usuário?

Sim.

> A aplicação foi desenvolvida com o React?

Sim.

> A aplicação contém pelo menos dois componentes React além do componente principal?

Sim.

> O código da minha aplicação possui comentários explicando cada operação?

Não. Apenas alguns comentários, o restante está bastante simples, então não achei necessário sujar o código com comentários irrelevantes.

> A aplicação está funcionando corretamente?

Sim.

> A aplicação está completa?

Sim. Ainda faltam algumas features, como filtro por "categoria" e "cozinha", mas essas podem ser consideradas featureas adicionais. O core da aplicação já está todo aí.
