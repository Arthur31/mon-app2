export function GET() {
  // const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  return Response.json({noData: true});
}

export function POST() {
  return new Response("Auth POST");
}