#!/usr/bin/env node

const server = require("fastify")();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

console.log(`worker pid=${process.pid}`);

server.get("/recipes/:id", async (request, reply) => {
  console.log(`worker request pid=${process.pid}`);
  const id = Number(request.params.id);
  if (id !== 42) {
    reply.statusCode = 404;
    return { error: "Not found" };
  }
  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: "Chicken Tikka Masala",
      steps: "Throw everything in a pan and cook for 20 minutes",
      ingredients: [
        { id: 1, name: "Chicken", quantity: "1 lb" },
        { id: 2, name: "Sauce", quantity: "2 cups" },
      ],
    },
  };
});

server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`);
});
