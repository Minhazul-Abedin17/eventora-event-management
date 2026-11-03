# 🎉 Eventora — Event Management Platform

**Plan • Organize • Celebrate**

Eventora is a full-stack event management platform that allows users to discover events, create and manage their own events, and join events through a simple and user-friendly interface.

The platform provides authentication, event management, booking management, and a responsive user experience.

---

## ✨ Features

- **User Authentication:** Sign up, sign in, and social authentication.
- **JWT Authentication:** Secure communication between frontend and backend.
- **Event Discovery:** Browse and explore available events.
- **Upcoming Events:** View upcoming events.
- **Create Events:** Create and publish new events.
- **Manage Events:** Edit and delete events created by users.
- **Event Details:** View event date, time, location, category, and available seats.
- **Event Booking:** Join available events.
- **My Bookings:** View and manage personal event bookings.
- **Booking Cancellation:** Cancel existing bookings.
- **User Profile:** View and update profile information.
- **Protected Routes:** Restrict access to authenticated users.
- **Responsive Design:** User-friendly interface for different screen sizes.
- **Loading UI:** Custom loading animation.
- **Custom 404 Page:** User-friendly page for unavailable routes.
- **Error Handling:** Custom error interface.

---

## 🛠️ Technologies Used

### Frontend

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React.js | Building user interfaces |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Styling and responsive design |
| shadcn/ui | Reusable UI components |
| Lucide React | Icons |
| Better Auth | User authentication |
| React Toastify | Toast notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend server and REST API |
| MongoDB | Database |
| MongoDB Node.js Driver | Database operations |
| JOSE | JWT verification |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

---

## 🔐 Authentication & Security

- Better Auth is used for user authentication.
- JWT is used to authenticate requests between the frontend and backend.
- JOSE is used to verify JWT tokens on the backend.
- Protected API routes require a valid authentication token.
- User-specific operations are restricted to the authenticated user.

---

## 🏗️ Project Structure

The project is organized into two main parts:

```text
Eventora/
│
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── events/
│   │   │   ├── create-event/
│   │   │   ├── my-events/
│   │   │   ├── my-bookings/
│   │   │   ├── profile/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   │
│   │   ├── components/
│   │   └── lib/
│   │
│   └── package.json
│
└── Backend/
    ├── index.js
    ├── package.json
    └── .env
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js
- npm
- MongoDB

### Frontend Setup

**1. Clone the frontend repository**

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
cd YOUR_FRONTEND_PROJECT_FOLDER
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the frontend root directory and configure the environment variables required by Better Auth and MongoDB.

**4. Run the development server**

```bash
npm run dev
```

Frontend will be available at:

`http://localhost:3000`

### Backend Setup

**1. Clone the backend repository**

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
cd YOUR_BACKEND_PROJECT_FOLDER
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the backend root directory.

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
```

Configure the JWT verification URL to match your frontend Better Auth server.

**4. Run the backend server**
---

## 🔌 API Functionalities

### Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/all-events` | Get all events |
| GET | `/all-events/:id` | Get event details |
| GET | `/upcoming-events` | Get upcoming events |
| POST | `/create-event` | Create an event |
| PATCH | `/all-events/:id` | Update an event |
| DELETE | `/all-events/:id` | Delete an event |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/my-booking` | Create a booking |
| GET | `/my-booking/:email` | Get user bookings |
| GET | `/my-booking/check` | Check existing booking |
| DELETE | `/my-booking/:id` | Cancel a booking |

*Note: Protected API endpoints require a valid JWT token.*

---

## 🎨 UI & Design

Eventora features a clean and modern interface with a violet-themed design.

- Responsive layouts
- Reusable UI components
- Consistent typography and colors
- Interactive buttons and navigation
- Custom loading and error states

---

## 🚀 Future Improvements

- Advanced event search and filtering
- Online payment integration
- Email notifications
- Event analytics dashboard

---

## 👨‍💻 Developer

**Jannatul Saira Samanta**

Full-Stack Web Development Project

- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

---

## 📄 License

This project was developed as a full-stack web development project for learning and practical implementation purposes.
