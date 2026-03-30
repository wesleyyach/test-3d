import HeroScene from "./components/HeroScene";

export default function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__badge">Laboratório visual 3D</span>
          <h1>Teste de interface com React e Three.js</h1>
          <p>
            Este projeto foi criado para experimentar elementos 3D em uma seção
            hero, explorando movimento, iluminação e presença visual sem mexer
            no portfólio principal.
          </p>

          <div className="hero__actions">
            <button type="button" className="btn btn--primary">
              Teste visual
            </button>
            <button type="button" className="btn btn--ghost">
              Explorar conceito
            </button>
          </div>
        </div>

        <div className="hero__scene">
          <HeroScene />
        </div>
      </section>
    </main>
  );
}