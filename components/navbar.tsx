"use client"

// Importaciones necesarias para el componente
import { useState } from "react" // Hook para manejar estados
import Link from "next/link" // Componente para navegación
import { usePathname } from "next/navigation" // Hook para obtener la ruta actual
import { Menu, Search, X, User, LogOut, BarChart3 } from "lucide-react" // Iconos para la interfaz

// Componentes de la interfaz de usuario
import { Button } from "@/components/ui/button"
import { LoginDialog } from "@/components/login-dialog" // Diálogo de inicio de sesión
import { RegisterDialog } from "@/components/register-dialog" // Diálogo de registro
import { SearchDialog } from "@/components/search-dialog" // Diálogo de búsqueda

/**
 * Componente de la barra de navegación principal
 * Incluye:
 * - Logo de la aplicación
 * - Menú de navegación
 * - Botones de inicio de sesión y registro
 * - Buscador
 * - Menú móvil responsive
 */
export function Navbar() {
  // Estados para controlar la visibilidad de diferentes elementos
  const [isMenuOpen, setIsMenuOpen] = useState(false)      // Menú móvil
  const [isLoginOpen, setIsLoginOpen] = useState(false)    // Diálogo de login
  const [isRegisterOpen, setIsRegisterOpen] = useState(false) // Diálogo de registro
  const [isSearchOpen, setIsSearchOpen] = useState(false)  // Diálogo de búsqueda

  // Obtener la ruta actual para resaltar el enlace activo
  const pathname = usePathname()

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo de la aplicación */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-teal-800">
              Go<span className="text-amber-600">Plan</span>
            </Link>
          </div>

          {/* Navegación para escritorio */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`relative transition-all duration-300 px-4 py-2 rounded-md ${pathname === "/" ? "text-teal-700 font-semibold bg-teal-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              Inicio
            </Link>
            <Link
              href="/destinos"
              className={`relative transition-all duration-300 px-4 py-2 rounded-md ${pathname === "/destinos" ? "text-teal-700 font-semibold bg-teal-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              Destinos
            </Link>
            <Link
              href="/planificador"
              className={`relative transition-all duration-300 px-4 py-2 rounded-md ${pathname === "/planificador" ? "text-teal-700 font-semibold bg-teal-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              Planificador
            </Link>
            <Link
              href="/experiencias"
              className={`relative transition-all duration-300 px-4 py-2 rounded-md ${pathname === "/experiencias" ? "text-teal-700 font-semibold bg-teal-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              Experiencias
            </Link>
            <Link
              href="/mapa"
              className={`relative transition-all duration-300 px-4 py-2 rounded-md ${pathname === "/mapa" ? "text-teal-700 font-semibold bg-teal-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              Mapa Interactivo
            </Link>
            <Link
              href="/dashboard"
              className={`relative flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-md ${pathname === "/dashboard" ? "text-teal-700 font-semibold bg-teal-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Perfil</span>
            </Link>
            <Link
              href="/preset-dashboard"
              className={`relative flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-md ${pathname === "/preset-dashboard" ? "text-teal-700 font-semibold bg-teal-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-teal-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="hidden md:inline">Analytics</span>
            </Link>
          </nav>

          {/* Botones de autenticación y búsqueda para escritorio */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-teal-700"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Button variant="ghost" onClick={() => setIsLoginOpen(true)} className="text-gray-700 hover:text-teal-700">
              Iniciar Sesión
            </Button>
            <Button onClick={() => setIsRegisterOpen(true)} className="bg-teal-700 hover:bg-teal-800 text-white">
              Registrarse
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Aquí puedes agregar la lógica de logout
                console.log('Logout clicked')
              }}
              className="text-gray-700 hover:text-red-700"
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar sesión</span>
            </Button>
          </div>

          {/* Botón del menú móvil y búsqueda */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-teal-700"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md ${pathname === "/" ? "text-teal-700 font-semibold bg-teal-100" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/destinos"
              className={`block px-3 py-2 rounded-md ${pathname === "/destinos" ? "text-teal-700 font-semibold bg-teal-100" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Destinos
            </Link>
            <Link
              href="/planificador"
              className={`block px-3 py-2 rounded-md ${pathname === "/planificador" ? "text-teal-700 font-semibold bg-teal-100" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Planificador
            </Link>
            <Link
              href="/experiencias"
              className={`block px-3 py-2 rounded-md ${pathname === "/experiencias" ? "text-teal-700 font-semibold bg-teal-100" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Experiencias
            </Link>
            <Link
              href="/mapa"
              className={`block px-3 py-2 rounded-md ${pathname === "/mapa" ? "text-teal-700 font-semibold bg-teal-100" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mapa Interactivo
            </Link>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${pathname === "/dashboard" ? "text-teal-700 font-semibold bg-teal-100" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Perfil</span>
            </Link>
            <Link
              href="/preset-dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${pathname === "/preset-dashboard" ? "text-teal-700 font-semibold bg-teal-100" : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <div className="pt-4 border-t flex flex-col space-y-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsLoginOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full"
              >
                Iniciar Sesión
              </Button>
              <Button
                onClick={() => {
                  setIsRegisterOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              >
                Registrarse
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Aquí puedes agregar la lógica de logout
                  console.log('Logout clicked')
                  setIsMenuOpen(false)
                }}
                className="w-full text-red-700 border-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogos de autenticación */}
      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <RegisterDialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen} />
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}

