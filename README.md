# Ai-backend project

This project is a backend service that allows users to upload, validate, and list measurements (such as water and gas readings) linked to customers. The service interacts with Google Gemini AI for image data processing and saves the results into a PostgreSQL database using Prisma ORM.

## Features

- **Upload Measurements**: Accepts an image in base64 format, processes it with Google Gemini AI, and saves the extracted data.
- **Validate Measurements**: Confirms the validity of a measurement reading.
- **List Measurements**: Retrieves all measurements associated with a customer, with optional filtering by measurement type.
  
## Database Structure

- **Customers Table**: Stores information about customers.
- **Measurements Table**: Stores measurement data (e.g., water, gas) linked to a customer.

### Prisma Schema

The database is defined using [Prisma](https://www.prisma.io/). Below is the schema:

```prisma
enum MeasurementType {
  WATER
  GAS
}

model Customer {
  id                   String              @id @default(uuid())  
  createdAt            DateTime            @default(now()) @map("created_at")
  updatedAt            DateTime            @updatedAt @map("updated_at")
  measurements         Measurement[]       @relation("CustomerMeasurements")
  @@map ("customers")
}

model Measurement {
  id                                String                   @id @default(uuid())
  createdAt                         DateTime                 @default(now()) @map("created_at")
  updatedAt                         DateTime                 @updatedAt @map("updated_at")
  measurementTime                   DateTime                 @map("measurement_time")
  measurementType                   MeasurementType          @map("measurement_type")
  value                             Decimal                  @map("value")
  hasConfirmedMeasurement           Boolean                  @map("has_confirmed_measurement")
  imageUrl                          String?                  @map("image_url")
  customer                          Customer                 @relation(fields: [customerId], references: [id], name: "CustomerMeasurements")
  customerId                        String                   @map("customer_id")
  @@map ("measurements")
}
```

## Getting Started
### Prerequisites

### Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/renanbianchi/ai-backend.git
    ```

2. Install dependencies:

    ```bash
    cd project-folder
    npm install
    ```

3. Set up your `.env` file:

   Create a `.env` file at the root of the project and define the necessary environment variables:

    ```env
    DATABASE_URL=postgresql://username:password@host:port/database
    ```

4. Run the Prisma migrations to set up your database schema:

    ```bash
    npx prisma migrate dev
    ```

5. Start the application:

    ```bash
    npm start
    ```

---

### Running with Docker

To run the database inside a Docker container, use the following commands:

1. Pull the PostgreSQL image:

    ```bash
    docker pull postgres
    ```

2. Start a PostgreSQL container:

    ```bash
    docker run --name project-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
    ```

3. Set your `.env` to use `host.docker.internal` as the host if you're using Docker for your database:

    ```env
    DATABASE_URL=postgresql://postgres:yourpassword@host.docker.internal:5432/postgres
    ```

---

## API Documentation (Swagger)

After starting the server, you can access the API documentation by navigating to:

```bash
http://localhost:3002/api-docs
