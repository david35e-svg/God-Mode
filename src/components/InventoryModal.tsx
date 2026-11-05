import React from "react";
import { UserProfile } from "../types";
import { X, Package, Sparkles } from "lucide-react";
import { sound } from "../lib/sound";

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: UserProfile["inventory"];
  coins: number;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  inventory,
  coins,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-800/60 rounded-3xl p-6 space-y-5 text-right dir-rtl shadow-2xl">
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-black text-white font-heading">תיק חפצים ואוצרות (Inventory)</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-800 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">מאזן מטבעות גיימר:</span>
          <span className="text-amber-400 font-bold text-sm">🪙 {coins} Coins</span>
        </div>

        <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-950 border border-purple-900/30 flex items-center gap-3"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="font-bold text-xs text-white block">{item.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono">x{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
