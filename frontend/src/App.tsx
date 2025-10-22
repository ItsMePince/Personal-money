// src/App.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

// Header + Navbar
import Header from "./components/Header";
import BottomNav from "./pages/buttomnav";

// หน้าหลัก
import Home from "./pages/Home";
import Day from "./pages/day";
import Month from "./pages/month";
import Income from "./pages/income";
import Expense from "./pages/expense";
import Summary from "./pages/summary";

// Auth / Account
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AccountSelect from "./pages/AccountSelect";
import AccountNew from "./pages/accountnew";

// Custom categories
import CustomIncome from "./pages/customincome";
import CustomOutcome from "./pages/customoutcome";

// ✅ เพิ่มหน้า More
import More from "./pages/more";

// (ตัวอย่าง) หน้าปลายทางของปุ่มใน More — ใส่จริงทีหลังได้
function Placeholder({ title }: { title: string }) {
    return (
        <div style={{ padding: 24 }}>
            <h2>{title}</h2>
            <p>ใส่เนื้อหาหน้านี้ภายหลังได้เลย</p>
        </div>
    );
}

function NotFound() {
    return (
        <div style={{ padding: 16 }}>
            <h3>404 - Page not found</h3>
            <a href="/">กลับหน้าแรก</a>
        </div>
    );
}

// Component สำหรับป้องกันหน้าที่ต้อง login
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

// Component สำหรับ redirect ถ้า login แล้ว
function AuthRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) return <Navigate to="/home" replace />;
    return <>{children}</>;
}

export default function App() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem("isAuthenticated") === "true"
    );
    const [isLoading, setIsLoading] = useState(false);

    const checkAuth = useCallback(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(authStatus);
    }, []);

    useEffect(() => {
        window.addEventListener("auth-changed", checkAuth);
        return () => window.removeEventListener("auth-changed", checkAuth);
    }, [checkAuth]);

    const currentPath = location.pathname;
    const authPages = ["/login", "/signup"];
    const isAuthPage = authPages.includes(currentPath);

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div>กำลังโหลด...</div>
            </div>
        );
    }

    return (
        <div className="App">
            {/* แสดง Header เฉพาะเมื่อ NOT auth page */}
            {!isAuthPage && <Header />}

            <Routes>
                {/* หน้าแรก - เป็น login เสมอ */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route
                    path="/signup"
                    element={
                        <AuthRoute>
                            <SignUp />
                        </AuthRoute>
                    }
                />

                {/* Protected Routes - ต้อง login ก่อน */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/day"
                    element={
                        <ProtectedRoute>
                            <Day />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/month"
                    element={
                        <ProtectedRoute>
                            <Month />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/income"
                    element={
                        <ProtectedRoute>
                            <Income />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/expense"
                    element={
                        <ProtectedRoute>
                            <Expense />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/summary"
                    element={
                        <ProtectedRoute>
                            <Summary />
                        </ProtectedRoute>
                    }
                />

                {/* Account Routes */}
                <Route
                    path="/accountselect"
                    element={
                        <ProtectedRoute>
                            <AccountSelect />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/accountnew"
                    element={
                        <ProtectedRoute>
                            <AccountNew />
                        </ProtectedRoute>
                    }
                />

                {/* Custom category Routes */}
                <Route
                    path="/customincome"
                    element={
                        <ProtectedRoute>
                            <CustomIncome />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customoutcome"
                    element={
                        <ProtectedRoute>
                            <CustomOutcome />
                        </ProtectedRoute>
                    }
                />

                {/* ✅ เส้นทางหน้า More */}
                <Route
                    path="/more"
                    element={
                        <ProtectedRoute>
                            <More />
                        </ProtectedRoute>
                    }
                />

                {/* (ตัวอย่าง) ปลายทางเมนูในหน้า More */}
                <Route
                    path="/recurring"
                    element={
                        <ProtectedRoute>
                            <Placeholder title="ธุรกรรมที่เกิดซ้ำ" />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tax"
                    element={
                        <ProtectedRoute>
                            <Placeholder title="คำนวณภาษีลดหย่อน" />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/export"
                    element={
                        <ProtectedRoute>
                            <Placeholder title="Export CSV" />
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* แสดง BottomNav เฉพาะเมื่อ NOT auth page */}
            {!isAuthPage && <BottomNav />}
        </div>
    );
}
// trigger CI test run
