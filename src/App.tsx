import { useEffect, useMemo, useState } from "react";
import { Settings2, Sparkles, SunMoon, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import "./App.css";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "dev-helper-theme";

const NAV_ITEMS = [{ label: "Главная", icon: Home, href: "#" }];

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const heroStats = useMemo(
    () => [
      { label: "Модули", value: "1", hint: "Главная страница доступна" },
      { label: "Темы", value: "Light/Dark", hint: "Переключатель в настройках" },
      { label: "UI", value: "shadcn + Tailwind v4", hint: "Готовый каркас" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <Sidebar collapsible="icon" variant="sidebar">
          <SidebarHeader className="gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              {/* <div className="grid">
                <span className="text-sm font-semibold leading-tight">Dev Helper</span>
                <span className="text-xs text-muted-foreground">Tauri + React</span>
              </div> */}
            </div>
            <SidebarTrigger className="ml-auto" />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Навигация</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive>
                        <a href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Сводка</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuSub>
                      {heroStats.map((stat) => (
                        <SidebarMenuSubButton key={stat.label} asChild>
                          <div className="flex items-center gap-3 rounded-md p-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                              <Sparkles className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium leading-tight">{stat.label}</p>
                              <p className="text-xs text-muted-foreground leading-tight">{stat.hint}</p>
                            </div>
                            <span className="ml-auto text-xs font-semibold text-primary">{stat.value}</span>
                          </div>
                        </SidebarMenuSubButton>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="flex flex-col gap-3">
            {/* <div className="flex items-center gap-2 rounded-md border p-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                <Palette className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">Темы</p>
                <p className="text-xs text-muted-foreground leading-tight">Светлая / тёмная</p>
              </div>
            </div> */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground">
                        <Settings2 className="h-4 w-4" />
                        <SidebarGroupLabel>Настройки</SidebarGroupLabel>
                      </button>
                    </SheetTrigger>
                    <SettingsPanel theme={theme} onThemeChange={setTheme} />
                  </Sheet>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground">Главная</p>
                <h1 className="text-lg font-semibold leading-tight">Рабочая область</h1>
              </div>
              <div className="flex items-center gap-2">
                <SidebarTrigger className="hidden sm:inline-flex" />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings2 className="h-4 w-4" />
                      Настройки
                    </Button>
                  </SheetTrigger>
                  <SettingsPanel theme={theme} onThemeChange={setTheme} />
                </Sheet>
              </div>
            </div>

            <main className="flex flex-1 flex-col gap-6 p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Добро пожаловать</CardTitle>
                  <CardDescription>
                    Это базовый слой интерфейса: слева — навигация и статус, справа — рабочая область для модулей.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.hint}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Справочная информация</CardTitle>
                  <CardDescription>Здесь будет рендериться контент модулей.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="about" className="w-full">
                    <TabsList>
                      <TabsTrigger value="about">О приложении</TabsTrigger>
                      <TabsTrigger value="tips">Подсказки</TabsTrigger>
                    </TabsList>
                    <TabsContent value="about" className="space-y-3">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Dev Helper — заготовка на Vite + Tauri + Tailwind v4. Мы используем компоненты shadcn/ui как свой код,
                        поэтому их можно смело править и адаптировать под задачи.
                      </p>
                      <div className="grid gap-3 md:grid-cols-3">
                        <Skeleton className="h-16 rounded-md" />
                        <Skeleton className="h-16 rounded-md" />
                        <Skeleton className="h-16 rounded-md" />
                      </div>
                    </TabsContent>
                    <TabsContent value="tips">
                      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        <li>Темы переключаются в настройках (светлая / тёмная).</li>
                        <li>Боковая панель сворачивается по кнопке или горячей клавише ⌘/Ctrl + B.</li>
                        <li>Добавляй новые модули в навигацию — структура уже готова.</li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function SettingsPanel({ theme, onThemeChange }: { theme: ThemeMode; onThemeChange: (mode: ThemeMode) => void }) {
  return (
    <SheetContent side="right" className="w-full max-w-md p-0">
      <SheetHeader className="border-b px-6 py-4">
        <SheetTitle className="flex items-center gap-2">
          <Settings2 className="h-4 w-4" />
          Настройки
        </SheetTitle>
        <SheetDescription className="text-sm text-muted-foreground">Настройте тему интерфейса приложения.</SheetDescription>
      </SheetHeader>
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">Тема</p>
          <p className="text-xs text-muted-foreground">Выберите оформление по умолчанию.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["light", "dark"] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onThemeChange(mode)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-left transition hover:border-primary hover:shadow-sm",
                  theme === mode && "border-primary bg-primary/5"
                )}
              >
                <SunMoon className="h-4 w-4" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold capitalize">{mode === "light" ? "Светлая" : "Тёмная"}</p>
                  <p className="text-xs text-muted-foreground">
                    {mode === "light" ? "Базовое светлое оформление" : "Тёмное оформление для ночной работы"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SheetContent>
  );
}

export default App;
