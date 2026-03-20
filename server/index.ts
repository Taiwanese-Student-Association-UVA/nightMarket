import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "./supabase";

const app = express();
const JWT_SECRET = process.env.JWT_SECRET!;
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://tsa-night-market.vercel.app"
  ]
}));
app.use(express.json());

/* ---------------- AUTH MIDDLEWARE ---------------- */

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

/* ---------------- ROUTES ---------------- */

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert({ username, password: hashed })
      .select()
      .single();

    if (error) {
      if (
        error.message.includes("duplicate key") ||
        error.message.includes("users_username_key")
      ) {
        return res.status(400).json({
          message: "Username already taken."
        });
      }

      return res.status(400).json({ message: error.message });
    }

    const token = jwt.sign({ id: data.id }, JWT_SECRET);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token });
});

app.get("/me", authenticateToken, async (req: any, res) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, username, points")
    .eq("id", req.user.id)
    .single();

  if (userError || !user) {
    return res.status(500).json({ message: "Could not fetch user" });
  }

  const { data: scans, error: scansError } = await supabase
    .from("scans")
    .select("stall_id")
    .eq("user_id", req.user.id);

  if (scansError) {
    return res.status(500).json({ message: "Could not fetch scanned stalls" });
  }

  const scannedStalls = (scans || []).map((scan: any) => Number(scan.stall_id));

  res.json({
    ...user,
    scannedStalls,
  });
});

// Scan NFC
app.post("/scan", authenticateToken, async (req: any, res) => {
  const { stallId } = req.body;

  const { error } = await supabase
    .from("scans")
    .insert({ user_id: req.user.id, stall_id: stallId });

  if (error) {
    return res.status(400).json({ message: "Already scanned" });
  }

  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("points")
    .eq("id", req.user.id)
    .single();

  if (fetchError || !user) {
    return res.status(500).json({ message: "Could not fetch user points" });
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ points: user.points + 10 })
    .eq("id", req.user.id);

  if (updateError) {
    return res.status(500).json({ message: "Could not update points" });
  }

  res.json({ message: "Points added!" });
});

// Redeem reward
app.post("/redeem", authenticateToken, async (req: any, res) => {
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("points")
    .eq("id", req.user.id)
    .single();

  if (fetchError || !user) {
    return res.status(500).json({ message: "Could not fetch user" });
  }

  if (user.points < 40) {
    return res.status(400).json({ message: "Not enough points" });
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ points: user.points - 40 })
    .eq("id", req.user.id);

  if (updateError) {
    return res.status(500).json({ message: "Could not redeem points" });
  }

  res.json({ message: "Reward redeemed!" });
});