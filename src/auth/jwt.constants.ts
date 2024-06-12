
const SECONDS = Number(process.env?.JWT_SECONDS_EXPIRE || 30)
const SECRET = String(process.env?.JWT_SECRET || "secret");

export const jwtConstants = {
  secret: SECRET,
  expire: SECONDS
}


