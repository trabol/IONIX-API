
const minutes = Number(process.env?.JWT_MINUTES_EXPIRE || 1)

export const jwtConstants = {
  secret: String(process.env?.JWT_SECRET || "secret"),
  expire: minutes * 60
}


