export default function Home() {
  return (

    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
      {/* Título principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
        Bem-vindo ao Sistema de Governança Digital
      </h1>

      {/* Texto descritivo */}
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-8">
        Este sistema permite que cidadãos participem ativamente das decisões governamentais,
        registrando propostas, votando e acompanhando resultados de forma segura e transparente.
      </p>

      {/* Botões principais */}
      <div className="flex gap-6 mt-6">
        <a
          href="/register"
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Criar Conta
        </a>
        <a
          href="/login"
          className="px-8 py-3 bg-gray-200 text-gray-800 text-lg rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Fazer Login
        </a>
      </div>

      {/* Imagem ilustrativa */}
      <div className="mt-12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/921/921490.png"
          alt="Governança Digital"
          className="w-64 h-64 object-contain mx-auto drop-shadow-lg"
        />
      </div>
    </div>
  );
}
