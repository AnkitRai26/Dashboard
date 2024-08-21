"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardContent, Button, TextField } from "@mui/material"
import { Plus, X } from "lucide-react"

const initialData = {
  categories: [
    {
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: 1, name: "Cloud Accounts", text: "Connected (2)\nNot Connected (2)" },
        {
          id: 2,
          name: "Cloud Account Risk Assessment",
          text: "Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)",
        },
      ],
    },
    {
      name: "CWPP Dashboard",
      widgets: [
        { id: 3, name: "Top 5 Namespace Specific Alerts", text: "No Graph data available!" },
        { id: 4, name: "Workload Alerts", text: "No Graph data available!" },
      ],
    },
    {
      name: "Registry Scan",
      widgets: [
        { id: 5, name: "Image Risk Assessment", text: "Critical (9)\nHigh (150)" },
        { id: 6, name: "Image Security Issues", text: "Critical (2)\nHigh (2)" },
      ],
    },
  ],
}

export default function Dashboard() {
  const [data, setData] = useState(initialData)
  const [newWidget, setNewWidget] = useState({ category: "", name: "", text: "" })
  const [search, setSearch] = useState("")
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false)

  const addWidget = () => {
    if (!newWidget.category || !newWidget.name || !newWidget.text) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedData = { ...data };
    const categoryIndex = updatedData.categories.findIndex(
    (cat) => cat.name.toLowerCase() === newWidget.category.trim().toLowerCase()
    );

    console.log("Selected Category:", newWidget.category);
    console.log("Available Categories:", updatedData.categories.map((cat) => cat.name));

    if (categoryIndex !== -1) {
      const newId = Math.max(...updatedData.categories.flatMap((cat) => cat.widgets.map((w) => w.id)), 0) + 1;
      updatedData.categories[categoryIndex].widgets.push({
        id: newId,
        name: newWidget.name,
        text: newWidget.text,
      });
      setData(updatedData);
      setNewWidget({ category: "", name: "", text: "" });
      setShowAddWidgetForm(false);
    } else {
      alert(`Selected category does not exist. Available categories are: ${updatedData.categories.map((cat) => cat.name).join(', ')}`);
    }
  }

  const removeWidget = (categoryName, widgetId) => {
    const updatedData = { ...data }
    const categoryIndex = updatedData.categories.findIndex((cat) => cat.name === categoryName)
    if (categoryIndex !== -1) {
      updatedData.categories[categoryIndex].widgets = updatedData.categories[categoryIndex].widgets.filter(
        (w) => w.id !== widgetId
      )
      setData(updatedData)
    }
  }

  const filteredWidgets = data.categories.flatMap((cat) =>
    cat.widgets.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">CNAPP Dashboard</h1>
        <div className="flex items-center gap-2">
          <TextField
            type="search"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button onClick={() => setShowAddWidgetForm(true)} variant="default">
            <Plus className="w-4 h-4" /> Add Widget
          </Button>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWidgets.length > 0 ? (
          filteredWidgets.map((widget) => {
            const category = data.categories.find((cat) =>
              cat.widgets.some((w) => w.id === widget.id)
            )
            return (
              <Card key={widget.id}>
                <CardHeader className="flex items-center justify-between">
                  <CardContent>{widget.name}</CardContent>
                  <Button variant="ghost" size="icon" onClick={() => removeWidget(category.name, widget.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p>{widget.text}</p>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <p>No widgets found for your search criteria.</p>
        )}
      </div>
      {showAddWidgetForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-md">
            <h2 className="mb-4 text-xl font-semibold">Add Widget</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="widget-category" className="block mb-1 font-medium">
                  Category
                </label>
                <TextField
                  id="widget-category"
                  value={newWidget.category}
                  onChange={(e) => setNewWidget({ ...newWidget, category: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="widget-name" className="block mb-1 font-medium">
                  Widget Name
                </label>
                <TextField
                  id="widget-name"
                  value={newWidget.name}
                  onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="widget-text" className="block mb-1 font-medium">
                  Widget Text
                </label>
                <TextField
                  id="widget-text"
                  value={newWidget.text}
                  onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddWidgetForm(false)}>
                  Cancel
                </Button>
                <Button onClick={addWidget}>
                  <Plus className="w-4 h-4" /> Add Widget
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
