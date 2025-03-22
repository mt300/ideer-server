// const { ChatOpenAI } = require("langchain/chat_models/openai");
const { ChatOpenAI } = require("@langchain/openai");

const { PromptTemplate } =  require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  maxTokens: 300, // Limitando para respostas otimizadas
  model: "gpt-4-turbo",
});

const prompt = new PromptTemplate({
  inputVariables: ["rede", "categoria", "tags","quantity", "humor"],
  template: `
Gere {quantity} ideias atuais, do ano de 2025, de posts para {rede} na categoria {categoria}.
As ideias devem ser diretas, criativas e usar o menor número de tokens possível.
Especifique alguma trend atual ou algo que possa ser relevante para aumentar o engajamento.
Considere as seguintes tags para personalização: {tags}.
Se {humor}, adicione um toque de humor.
Para cada ideia, sugira um possível ajuste para melhorar o conteúdo.
CADA IDEIA DEVE SER COMPLETA, sem interrupções. 
Formato:
1. [Título do post] - [Descrição curta] - [Sugestão de ajuste]
2. ...
  `,
});

// const fixPrompt = new PromptTemplate({
//     inputVariables: ["idea"],
//     template: `complete a ideia de post e garanta que o conteudo nao seja interrompido: "{idea}"`,
// })

const chain = RunnableSequence.from([prompt, model]);

async function generatePostIdeas(rede, categoria, tags, humor=false) {
    const formattedTags = tags.join(", ");
    const response = await chain.invoke({ rede, categoria, tags: formattedTags,humor, quantity: 3 });
    console.log(response.lc_kwargs.content);
    const ideas = response.lc_kwargs.content.split("\n").filter((line) => line.length > 0);
    // console.log(ideas)
    // Verificar se a última ideia está cortada (sem ponto final ou terminada de forma abrupta)
    const lastIdea = ideas[ideas.length - 1];
    if (lastIdea && !lastIdea.trim().endsWith(".")) {
        // Reenviar ao modelo para completar a última ideia
        const newResponse = await chain.invoke({ rede, categoria, tags: formattedTags, humor, quantity: 1 });
        const newIdeas = newResponse.lc_kwargs.content.split("\n").filter((line) => line.length > 0);
        ideas[ideas.length - 1] = newIdeas[0].replace("1. ", `${ideas.length}. `);
        // console.log("New Ideas Array",newIdeas);
    }
    return ideas;
}


module.exports = { generatePostIdeas };
