-- CreateTable
CREATE TABLE "app_api" (
    "id" SERIAL NOT NULL,
    "Api_Type" TEXT NOT NULL,
    "Api_Key" TEXT NOT NULL,
    "Api_Secret" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "app_api_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_user" (
    "user_id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "app_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "app_auth" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "app_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_otp" (
    "id" SERIAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_emailTemplates" (
    "id" SERIAL NOT NULL,
    "template" TEXT NOT NULL,
    "selected" BOOLEAN DEFAULT false,
    "template_type" INTEGER NOT NULL,
    "isOrder" BOOLEAN,

    CONSTRAINT "app_emailTemplates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_api_Api_Type_key" ON "app_api"("Api_Type");

-- CreateIndex
CREATE UNIQUE INDEX "app_auth_domain_key" ON "app_auth"("domain");

-- AddForeignKey
ALTER TABLE "app_otp" ADD CONSTRAINT "app_otp_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "app_auth"("domain") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_emailTemplates" ADD CONSTRAINT "app_emailTemplates_template_type_fkey" FOREIGN KEY ("template_type") REFERENCES "app_api"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
