Balanço(receitas e despesas) dos municípios de São Paulo
--

Aplicação para facilitar as despesas e receitas dos municípios de São Paulo usando dados do [portal da transparência do TCE](http://transparencia.tce.sp.gov.br/).

### Estrutura e tecnologias

Utilizamos javascript com node.js e gulp. A estrutura da aplicação é:
* `data`: Contém os dados baixados do portal do TCE;* `scripts-transform`: Scripts que irão transformar os dados do CSV em JSON na estrutura necessária para consumo da aplicação;* `app`: A aplicação em sí que será construída pelo gulp.
