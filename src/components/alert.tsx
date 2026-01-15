"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, CheckCircle, Info, XCircle, Megaphone } from "lucide-react";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertProps {
    type?: AlertType;
    title: string;
    message?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const alertStyles: Record<AlertType, { bg: string; border: string; icon: typeof Info; iconColor: string }> = {
    info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: Info, iconColor: "text-blue-400" },
    success: { bg: "bg-green-500/10", border: "border-green-500/30", icon: CheckCircle, iconColor: "text-green-400" },
    warning: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: AlertTriangle, iconColor: "text-yellow-400" },
    error: { bg: "bg-red-500/10", border: "border-red-500/30", icon: XCircle, iconColor: "text-red-400" },
};

export function Alert({ type = "info", title, message, dismissible = true, onDismiss }: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);
    const style = alertStyles[type];
    const Icon = style.icon;

    const handleDismiss = () => {
        setIsVisible(false);
        onDismiss?.();
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${style.bg} ${style.border} border rounded-xl p-4 flex gap-3`}
        >
            <Icon className={`${style.iconColor} shrink-0 mt-0.5`} size={20} />
            <div className="flex-1">
                <h4 className="font-medium text-white text-sm">{title}</h4>
                {message && <p className="text-neutral-400 text-xs mt-1">{message}</p>}
            </div>
            {dismissible && (
                <button onClick={handleDismiss} className="text-neutral-500 hover:text-white transition-colors">
                    <X size={16} />
                </button>
            )}
        </motion.div>
    );
}

// Global alert system
interface GlobalAlert {
    id: string;
    type: AlertType;
    title: string;
    message?: string;
    duration?: number;
}

let alertListeners: ((alerts: GlobalAlert[]) => void)[] = [];
let currentAlerts: GlobalAlert[] = [];

export function showAlert(alert: Omit<GlobalAlert, "id">) {
    const newAlert: GlobalAlert = {
        ...alert,
        id: `${Date.now()}-${Math.random()}`,
    };
    currentAlerts = [...currentAlerts, newAlert];
    alertListeners.forEach(listener => listener(currentAlerts));

    if (alert.duration !== 0) {
        setTimeout(() => {
            currentAlerts = currentAlerts.filter(a => a.id !== newAlert.id);
            alertListeners.forEach(listener => listener(currentAlerts));
        }, alert.duration || 5000);
    }
}

export function AlertContainer() {
    const [alerts, setAlerts] = useState<GlobalAlert[]>([]);

    useEffect(() => {
        alertListeners.push(setAlerts);
        return () => {
            alertListeners = alertListeners.filter(l => l !== setAlerts);
        };
    }, []);

    return (
        <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
            <AnimatePresence>
                {alerts.map(alert => (
                    <Alert
                        key={alert.id}
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        onDismiss={() => {
                            currentAlerts = currentAlerts.filter(a => a.id !== alert.id);
                            alertListeners.forEach(listener => listener(currentAlerts));
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
