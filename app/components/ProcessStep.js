import React from "react";

export function ProcessStep({ title, description, icon: Icon, index }) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30 p-6 transition-all hover:border-gray-600">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="absolute -top-2 -left-2 w-5 h-5 bg-gray-900 rounded flex items-center justify-center text-sm font-medium text-emerald-400">
            {index}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
