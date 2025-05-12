import { app } from './api/server.js';

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Local server running on http://localhost:${port}`);
});
