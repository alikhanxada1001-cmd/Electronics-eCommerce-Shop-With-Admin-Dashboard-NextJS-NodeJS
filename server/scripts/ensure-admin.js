const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const bcrypt = require("bcryptjs");
const prisma = require("../utills/db");

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in the server environment before provisioning the admin.");
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters long.");
  }

  const passwordHash = await bcrypt.hash(password, 14);
  const admin = await prisma.user.upsert({
    where: { email },
    update: { password: passwordHash, role: "admin" },
    create: { email, password: passwordHash, role: "admin" },
    select: { id: true, email: true, role: true },
  });

  console.log(`Admin account provisioned: ${admin.email} (${admin.role})`);
}

main()
  .catch((error) => {
    console.error("Admin provisioning failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
