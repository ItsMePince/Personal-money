// src/pages/more.tsx
// @ts-nocheck
import React, { useMemo, useState } from "react";
import "./more.css";
import { RefreshCw, Banknote, FileSpreadsheet, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function More() {
    const navigate = useNavigate();
    const [openCsv, setOpenCsv] = useState(false); // 👈 dropdown state

    const rows = useMemo(
        () => [
            { key: "recurring", label: "ธุรกรรมที่เกิดซ้ำ", icon: RefreshCw, onClick: () => navigate("/recurring") },
            { key: "tax",       label: "คำนวณภาษีลดหย่อน", icon: Banknote,  onClick: () => navigate("/tax") },
            // 🔻 ลบ csv ออกจาก map; ทำแบบพิเศษด้านล่างแทน (มี dropdown)
        ],
        [navigate]
    );

    const goExport = (range: "all" | "month" | "day") => {
        navigate(`/export?range=${range}`);
        setOpenCsv(false);
    };

    return (
        <div className="more-wrap">
            <h2 className="more-title">รายการเพิ่มเติม</h2>

            <section className="pill-list" aria-label="รายการเพิ่มเติม">
                {rows.map((r) => {
                    const Icon = r.icon;
                    return (
                        <button key={r.key} className="pill-row" onClick={r.onClick} aria-label={r.label}>
              <span className="left">
                <span className="icon-wrap">
                  <Icon className="lucide" size={22} strokeWidth={2} />
                </span>
                <span className="label">{r.label}</span>
              </span>
                            <ChevronRight size={18} className="chev" aria-hidden="true" />
                        </button>
                    );
                })}

                {/* ========= Export CSV with dropdown ========= */}
                <div className={`pill-accordion ${openCsv ? "open" : ""}`}>
                    <button
                        className="pill-row"
                        onClick={() => setOpenCsv((v) => !v)}
                        aria-expanded={openCsv}
                        aria-controls="csv-dropdown"
                    >
            <span className="left">
              <span className="icon-wrap">
                <FileSpreadsheet className="lucide" size={22} strokeWidth={2} />
              </span>
              <span className="label">Export CSV</span>
            </span>
                        <ChevronDown size={18} className={`chev ${openCsv ? "rot" : ""}`} aria-hidden="true" />
                    </button>

                    <div id="csv-dropdown" className={`dropdown ${openCsv ? "show" : ""}`} role="menu">
                        <button className="dropdown-item" onClick={() => goExport("all")} role="menuitem">
                            ทั้งหมด
                        </button>
                        <button className="dropdown-item" onClick={() => goExport("month")} role="menuitem">
                            รายเดือน
                        </button>
                        <button className="dropdown-item" onClick={() => goExport("day")} role="menuitem">
                            รายวัน
                        </button>
                    </div>
                </div>
                {/* =========================================== */}
            </section>
        </div>
    );
}
