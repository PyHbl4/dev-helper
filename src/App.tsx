import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function greet() {
    setIsSaving(true);
    try {
      setGreetMsg(await invoke("greet", { name }));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="tw-min-h-screen tw-bg-background tw-text-foreground">
      <header className="tw-border-b">
        <div className="tw-container tw-flex tw-items-center tw-justify-between tw-gap-4 tw-py-4">
          <div className="tw-flex tw-items-center tw-gap-3">
            <img src="/tauri.svg" alt="Tauri" className="tw-h-8 tw-w-8" />
            <div>
              <p className="tw-text-xs tw-uppercase tw-text-muted-foreground">Dev Helper</p>
              <p className="tw-text-base tw-font-semibold">Tauri + React + Tailwind</p>
            </div>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Ресурсы</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="tw-grid tw-gap-3 tw-p-4 tw-md:w-[400px] tw-lg:w-[500px] tw-lg:grid-cols-[.75fr_1fr]">
                    <li className="tw-row-span-3 tw-h-full">
                      <Card className="tw-h-full tw-bg-gradient-to-br tw-from-primary/15 tw-to-primary/5">
                        <CardHeader>
                          <CardTitle>Готово к работе</CardTitle>
                          <CardDescription>
                            Настроенный стек Vite + Tauri с Tailwind-префиксом для безопасной интеграции.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </li>
                    <li>
                      <NavigationMenuLink className={navigationMenuTriggerStyle("tw-justify-start tw-gap-2")} href="https://tauri.app">
                        Документация Tauri
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className={navigationMenuTriggerStyle("tw-justify-start tw-gap-2")} href="https://ui.shadcn.com">
                        Компоненты shadcn/ui
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className={navigationMenuTriggerStyle("tw-justify-start tw-gap-2")} href="https://tailwindcss.com/docs">
                        Руководство Tailwind
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Справка</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Shadcn/ui готов</DialogTitle>
                <DialogDescription>
                  Базовые UI-компоненты с префиксом Tailwind подключены и готовы к использованию в окне Tauri.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogPrimitiveClose />
                <Button asChild>
                  <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                    Открыть библиотеку
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="tw-container tw-flex tw-flex-col tw-gap-8 tw-py-10">
        <Card>
          <CardHeader className="tw-flex tw-flex-col tw-gap-1.5 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between">
            <div>
              <CardTitle>Приветствие через Tauri</CardTitle>
              <CardDescription>Введите имя и отправьте команду в бэкенд.</CardDescription>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Панель действий</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Быстрые ссылки</SheetTitle>
                  <SheetDescription>Полезные ресурсы для разработки.</SheetDescription>
                </SheetHeader>
                <div className="tw-space-y-3">
                  <Button asChild className="tw-w-full">
                    <a href="https://vite.dev" target="_blank" rel="noreferrer">
                      Сайт Vite
                    </a>
                  </Button>
                  <Button asChild className="tw-w-full" variant="secondary">
                    <a href="https://react.dev" target="_blank" rel="noreferrer">
                      Документация React
                    </a>
                  </Button>
                  <Button asChild className="tw-w-full" variant="ghost">
                    <a href="https://tauri.app" target="_blank" rel="noreferrer">
                      Узнать о Tauri
                    </a>
                  </Button>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="secondary">Закрыть</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardHeader>

          <CardContent className="tw-space-y-6">
            <form
              className="tw-grid tw-gap-4 sm:tw-grid-cols-[1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                void greet();
              }}
            >
              <label className="tw-space-y-2">
                <span className="tw-text-sm tw-font-medium">Имя</span>
                <Input
                  id="greet-input"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Введите имя..."
                  required
                />
              </label>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Отправка..." : "Поздороваться"}
              </Button>
            </form>

            <Tabs defaultValue="result" className="tw-w-full">
              <TabsList>
                <TabsTrigger value="result">Результат</TabsTrigger>
                <TabsTrigger value="tips">Подсказки</TabsTrigger>
              </TabsList>
              <TabsContent value="result">
                <CardDescription className="tw-rounded-md tw-border tw-bg-muted/40 tw-p-4">
                  {greetMsg || "Сообщение появится после вызова команды."}
                </CardDescription>
              </TabsContent>
              <TabsContent value="tips">
                <ul className="tw-list-disc tw-space-y-2 tw-pl-6 tw-text-sm tw-text-muted-foreground">
                  <li>Tailwind использует префикс <code>tw-</code> для безопасной работы в окне Tauri.</li>
                  <li>Компоненты shadcn/ui находятся в каталоге <code>src/components/ui</code>.</li>
                  <li>Глобальные стили определены в <code>src/index.css</code>.</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function DialogPrimitiveClose() {
  return (
    <DialogClose asChild>
      <Button variant="ghost">Закрыть</Button>
    </DialogClose>
  );
}

export default App;
