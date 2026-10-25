# Job Application Tracker

A full-stack web application to organize and manage job applications in one place. Track application statuses, search and filter opportunities, monitor your progress, and manage your job search through a responsive dashboard.

**Live Demo:** [Job Application Tracker](https://job-application-tracker-nine-xi.vercel.app/)

**Backend API:** [Live API](https://job-application-tracker-api-b893.onrender.com/api/jobs)

## Screenshots

**Dashboard:**
![Job application tracker dashboard with summary statistics and a list of job applications, presented together in the main workspace for reviewing application progress.](screenshots\Dashboard.png)
**Application Form:**
![Job application form for entering job details, displayed in the tracker interface for adding an application.](screenshots\Add_application_form.png)

## Features

- **Dashboard Statistics** — View total applications and counts by status.
- **Create Applications** — Add company, position, location, application date, job link, and notes.
- **Edit Applications** — Update existing application details.
- **Delete Applications** — Remove applications with a confirmation prompt.
- **Search** — Find applications by company name or job position.
- **Filter by Status** — Filter applications by Applied, Interview, Offer, or Rejected.
- **Sort Applications** — Sort by application date, newest or oldest first.
- **Form Validation** — Validate application data on the frontend and backend.
- **Loading and Error States** — Display feedback while fetching data and when API requests fail.
- **Responsive Design** — Use the dashboard on desktop, tablet, and mobile screens.
- **Persistent Storage** — Store application records in MongoDB Atlas.

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- Axios
- CSS

**Backend**

- Node.js
- Express.js
- TypeScript
- Mongoose
- REST API

**Database and Deployment**

- MongoDB Atlas
- Render — Backend hosting
- Vercel — Frontend hosting
- Git and GitHub — Version control

## Application Architecture

The frontend communicates with the Express REST API through Axios. The backend processes requests, validates data, and interacts with MongoDB Atlas through Mongoose.

```text
React + TypeScript (Vercel)
          |
          | HTTP requests using Axios
          v
Express + TypeScript (Render)
          |
          | Mongoose
          v
MongoDB Atlas
```

## API Endpoints

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| GET    | `/api/jobs`     | Retrieve all applications |
| GET    | `/api/jobs/:id` | Retrieve one application  |
| POST   | `/api/jobs`     | Create an application     |
| PATCH  | `/api/jobs/:id` | Update an application     |
| DELETE | `/api/jobs/:id` | Delete an application     |

The API includes request validation, invalid ID handling, centralized error handling, and not-found responses.

## Project Structure

```text
job-application-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobCard.tsx
│   │   │   └── JobForm.tsx
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   ├── services/
│   │   │   └── jobService.ts
│   │   ├── types/
│   │   │   └── job.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   └── jobController.ts
│   │   ├── middleware/
│   │   │   └── errorMiddleware.ts
│   │   ├── models/
│   │   │   └── Job.ts
│   │   ├── routes/
│   │   │   └── jobRoutes.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   └── package.json
│
└── README.md
```

## Getting Started Locally

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or another accessible MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Rohan6802/job-application-tracker.git
cd job-application-tracker
```

### 2. Configure the backend

Install backend dependencies:

```bash
cd server
npm install
```

Create a `server/.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace the MongoDB placeholder with your own connection string. Ensure the connection targets your intended database.

### 3. Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend should run locally on port `5000`, unless another port is configured.

### 4. Configure the frontend

Open a second terminal at the project root:

```bash
cd client
npm install
```

Create a `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api/jobs
```

This URL connects the local frontend to the local backend.

### 5. Start the frontend

From the `client` directory:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production Build

### Frontend

From the `client` directory:

```bash
npm run build
```

Vite generates the production files in `client/dist`.

### Backend

From the `server` directory:

```bash
npm run build
npm start
```

TypeScript compiles the backend into `server/dist`, and Node.js starts the compiled server.

## Environment Variables

| Variable       | Used by  | Purpose                                 |
| -------------- | -------- | --------------------------------------- |
| `MONGO_URI`    | Backend  | MongoDB connection string               |
| `PORT`         | Backend  | Server port; defaults to `5000` locally |
| `VITE_API_URL` | Frontend | Base URL for the jobs API               |

For production, configure environment variables in the hosting provider's dashboard. The deployed frontend should use the live backend URL:

`https://job-application-tracker-api-b893.onrender.com/api/jobs`

Never commit real credentials, database passwords, or private environment files to GitHub.

## Deployment

- **Frontend:** [Vercel deployment](https://job-application-tracker-nine-xi.vercel.app/)
- **Backend:** [Render API](https://job-application-tracker-api-b893.onrender.com/api/jobs)
- **Database:** MongoDB Atlas

The frontend is deployed separately from the backend. Configure `VITE_API_URL` in Vercel's project environment variables and redeploy whenever the production API URL changes.

## Future Improvements

- User registration and authentication
- Per-user application data and access control
- Pagination for large application lists
- Enhanced analytics and application insights
- Automated testing

## Security Note

This project currently does not implement user authentication. Do not store sensitive personal information in the publicly accessible application until authentication and server-side authorization are implemented.

## Author

**Rohan Sharma**

- GitHub: [@Rohan6802](https://github.com/Rohan6802)
- Live Project: [Job Application Tracker](https://job-application-tracker-nine-xi.vercel.app/)
