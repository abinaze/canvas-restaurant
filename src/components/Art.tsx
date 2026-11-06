/**
 * Original flat-print illustrations used until official photographs are added.
 * They are deliberately illustrations (not fake photos) and are labelled as such in the UI.
 */
import type { ReactNode } from "react";

export type ArtKind =
  | "pizza" | "calzone" | "pasta" | "lasagne" | "salad" | "steak" | "seafood"
  | "tiramisu" | "pannacotta" | "mousse" | "dessert" | "coffee" | "espresso" | "coldcoffee"
  | "facade" | "interior" | "lane";

const C = {
  ink: "#17150F", paper: "#FAF8F3", tomato: "#C8321F", tomatoDark: "#9C2416", basil: "#2F5D3A",
  basilLight: "#5E8F4E", ochre: "#D9A441", crust: "#D8A15A", crustDark: "#B67A33", cheese: "#F4DFA0",
  cream: "#F6EBD4", plate: "#FFFDF8", board: "#B88A55", cocoa: "#4A2C1D", berry: "#9B2C4A",
  steel: "#8E9A96", glass: "#E9F0EE",
};

const BACKDROP: Record<ArtKind, string> = {
  pizza: "#D3DDC6", calzone: "#D3DDC6", pasta: "#F0DDB0", lasagne: "#F0DDB0", salad: "#EFCFC2",
  steak: "#DCD2BF", seafood: "#CFDDDB", tiramisu: "#F0D5CE", pannacotta: "#F0D5CE", mousse: "#F0D5CE",
  dessert: "#F0D5CE", coffee: "#E3D3BF", espresso: "#E3D3BF", coldcoffee: "#E3D3BF",
  facade: "#17150F", interior: "#26231C", lane: "#CFDDDB",
};

const hash = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};
const rng = (seed: string) => {
  let a = hash(seed) || 1;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const inDisc = (r: () => number, R: number) => {
  const a = r() * Math.PI * 2, d = Math.sqrt(r()) * R;
  return { x: 200 + Math.cos(a) * d, y: 150 + Math.sin(a) * d, a: a * 57.3 };
};
const Leaf = ({ x, y, a, s = 1 }: { x: number; y: number; a: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <ellipse rx="13" ry="6" fill={C.basil} />
    <path d="M-12 0H12" stroke={C.basilLight} strokeWidth="1.2" />
  </g>
);

function Pizza({ seed }: { seed: string }) {
  const r = rng(seed);
  const v = hash(seed) % 4;
  const nutella = seed.includes("nutella");
  const white = v === 3 || seed.includes("4-cheese");
  return (
    <>
      <circle cx="200" cy="154" r="132" fill="#000" opacity=".1" />
      <circle cx="200" cy="150" r="130" fill={C.board} />
      <circle cx="200" cy="150" r="122" fill="none" stroke="#9C7242" strokeWidth="2" />
      <circle cx="200" cy="150" r="108" fill={C.crust} />
      <circle cx="200" cy="150" r="108" fill="none" stroke={C.crustDark} strokeWidth="3" strokeDasharray="2 9" />
      <circle cx="200" cy="150" r="92" fill={nutella ? C.cocoa : white ? C.cream : C.tomato} />
      {!nutella && Array.from({ length: 13 }, (_, i) => {
        const p = inDisc(r, 78);
        return <ellipse key={i} cx={p.x} cy={p.y} rx={13 + r() * 9} ry={8 + r() * 6} fill={C.cheese} opacity={0.95} transform={`rotate(${p.a} ${p.x} ${p.y})`} />;
      })}
      {nutella && Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${120 + i * 10} 100 q40 ${30 + i * 8} 80 ${60 + i * 6}`} stroke="#7A4A2E" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".8" />
      ))}
      {!nutella && v === 0 && Array.from({ length: 6 }, (_, i) => { const p = inDisc(r, 70); return <Leaf key={i} x={p.x} y={p.y} a={p.a} />; })}
      {!nutella && v === 1 && Array.from({ length: 9 }, (_, i) => { const p = inDisc(r, 72); return <g key={i}><circle cx={p.x} cy={p.y} r="10" fill={C.tomatoDark} /><circle cx={p.x - 2} cy={p.y - 2} r="2" fill="#E58C7C" /><circle cx={p.x + 3} cy={p.y + 2} r="1.6" fill="#E58C7C" /></g>; })}
      {!nutella && v === 2 && Array.from({ length: 12 }, (_, i) => {
        const p = inDisc(r, 72); const k = i % 3;
        return k === 0 ? <circle key={i} cx={p.x} cy={p.y} r="7" fill="none" stroke={C.basilLight} strokeWidth="3.5" />
          : k === 1 ? <circle key={i} cx={p.x} cy={p.y} r="6" fill={C.ink} />
          : <ellipse key={i} cx={p.x} cy={p.y} rx="8" ry="6" fill="#E3CFA8" />;
      })}
      {!nutella && v === 3 && Array.from({ length: 9 }, (_, i) => { const p = inDisc(r, 70); return <circle key={i} cx={p.x} cy={p.y} r={3 + r() * 3} fill={i % 2 ? "#8FA3B8" : C.basilLight} />; })}
    </>
  );
}

function Calzone() {
  return (
    <>
      <ellipse cx="200" cy="168" rx="138" ry="86" fill="#000" opacity=".1" />
      <ellipse cx="200" cy="160" rx="132" ry="84" fill={C.board} />
      <path d="M78 170a122 80 0 0 1 244 0z" fill={C.crust} />
      <path d="M78 170a122 80 0 0 1 244 0z" fill="none" stroke={C.crustDark} strokeWidth="3" />
      <path d="M92 168h216" stroke={C.crustDark} strokeWidth="5" strokeDasharray="3 9" />
      <path d="M120 150q80-60 160 0" fill="none" stroke="#E9BE80" strokeWidth="6" strokeLinecap="round" opacity=".7" />
      <circle cx="170" cy="128" r="6" fill={C.tomato} opacity=".7" /><circle cx="230" cy="136" r="5" fill={C.tomato} opacity=".7" />
      <Leaf x={200} y={118} a={-20} s={0.8} />
    </>
  );
}

function Pasta({ seed }: { seed: string }) {
  const r = rng(seed);
  const sauces = [C.tomato, C.basilLight, "#EBD9A9", C.cocoa];
  const sauce = seed.includes("pesto") ? sauces[1] : seed.includes("gorgonzola") ? sauces[2] : seed.includes("bolognese") ? sauces[3] : sauces[0];
  return (
    <>
      <circle cx="200" cy="154" r="128" fill="#000" opacity=".1" />
      <circle cx="200" cy="150" r="126" fill={C.plate} />
      <circle cx="200" cy="150" r="104" fill="none" stroke="#E7DFCF" strokeWidth="5" />
      <circle cx="200" cy="150" r="86" fill="#EFD9A0" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={200 + Math.sin(i) * 4} cy={150 + Math.cos(i) * 4} r={14 + i * 8} fill="none" stroke={i % 2 ? C.ochre : "#E7C773"} strokeWidth="7" strokeDasharray={`${40 + r() * 40} ${8 + r() * 10}`} strokeLinecap="round" transform={`rotate(${i * 40} 200 150)`} />
      ))}
      <path d="M150 140q50-40 100 0q-10 56-50 60q-40-4-50-60z" fill={sauce} opacity=".92" />
      {Array.from({ length: 4 }, (_, i) => { const p = inDisc(r, 40); return <Leaf key={i} x={p.x} y={p.y} a={p.a} s={0.9} />; })}
    </>
  );
}

function Lasagne() {
  const layers = [C.cream, C.tomato, C.cheese, C.cream, C.tomato, C.cheese, C.cream];
  return (
    <>
      <ellipse cx="200" cy="236" rx="150" ry="22" fill="#000" opacity=".12" />
      <ellipse cx="200" cy="226" rx="148" ry="26" fill={C.plate} />
      <g>
        {layers.map((c, i) => <rect key={i} x="108" y={170 - i * 15 + (i === 0 ? 0 : 0)} width="184" height="17" rx="5" fill={c} stroke="#00000014" />)}
        <path d="M104 78q96-26 192 0l-2 22q-94 14-188 0z" fill="#C98B3E" />
        <path d="M118 84q82-14 164 0" stroke={C.cheese} strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
      <Leaf x={206} y={74} a={-15} s={1.2} />
    </>
  );
}

function Salad({ seed }: { seed: string }) {
  const r = rng(seed);
  return (
    <>
      <circle cx="200" cy="154" r="128" fill="#000" opacity=".1" />
      <circle cx="200" cy="150" r="126" fill={C.plate} />
      <circle cx="200" cy="150" r="102" fill="none" stroke="#E7DFCF" strokeWidth="4" />
      {Array.from({ length: 22 }, (_, i) => { const p = inDisc(r, 82); return <ellipse key={i} cx={p.x} cy={p.y} rx={20 + r() * 8} ry={9 + r() * 4} fill={i % 3 ? C.basilLight : C.basil} transform={`rotate(${p.a} ${p.x} ${p.y})`} />; })}
      {Array.from({ length: 6 }, (_, i) => { const p = inDisc(r, 66); return <g key={i}><circle cx={p.x} cy={p.y} r="14" fill={C.tomato} /><circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#E5826F" strokeWidth="2" /></g>; })}
      {Array.from({ length: 6 }, (_, i) => { const p = inDisc(r, 66); return <rect key={i} x={p.x - 7} y={p.y - 7} width="14" height="14" rx="2" fill={C.plate} stroke="#D8D0BF" transform={`rotate(${p.a} ${p.x} ${p.y})`} />; })}
    </>
  );
}

function Steak() {
  return (
    <>
      <ellipse cx="200" cy="158" rx="152" ry="112" fill="#000" opacity=".1" />
      <ellipse cx="200" cy="152" rx="150" ry="110" fill={C.plate} />
      <ellipse cx="200" cy="152" rx="124" ry="88" fill="none" stroke="#E7DFCF" strokeWidth="4" />
      <ellipse cx="166" cy="166" rx="46" ry="26" fill="#3B2414" opacity=".85" />
      <path d="M118 140q10-44 70-40q54 6 50 46q-6 40-64 40q-66-2-56-46z" fill="#7C4A2A" />
      <path d="M130 140q10-30 58-28q40 4 38 32" stroke="#A36B43" strokeWidth="5" fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${140 + i * 24} 118l-14 66`} stroke="#4B2B18" strokeWidth="5" strokeLinecap="round" opacity=".7" />)}
      {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={268 + (i % 2) * 6} cy={98 + i * 20} rx="20" ry="8" fill={i % 2 ? C.basilLight : C.ochre} transform={`rotate(${-16 + i * 6} 268 ${98 + i * 20})`} />)}
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={248 + i * 8} y={186 + (i % 2) * 4} width="7" height="36" rx="3" fill="#E7B84F" transform={`rotate(${20 - i * 4} ${250 + i * 8} 200)`} />)}
    </>
  );
}

function Seafood({ seed }: { seed: string }) {
  const rings = seed.includes("calamari");
  return (
    <>
      <circle cx="200" cy="154" r="128" fill="#000" opacity=".1" />
      <circle cx="200" cy="150" r="126" fill={C.plate} />
      <circle cx="200" cy="150" r="102" fill="none" stroke="#E7DFCF" strokeWidth="4" />
      {rings
        ? [[160, 120], [210, 112], [248, 146], [196, 160], [150, 176], [232, 192]].map(([x, y], i) => (
            <g key={i}><circle cx={x} cy={y} r="22" fill="none" stroke="#E2B05C" strokeWidth="11" /><circle cx={x} cy={y} r="27" fill="none" stroke="#C98B3E" strokeWidth="1.5" strokeDasharray="3 6" /></g>
          ))
        : [[150, 128, 0], [214, 118, 30], [178, 178, 160], [244, 168, 200]].map(([x, y, a], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
              <path d="M-34 0q6-28 38-26q26 4 28 26q-22-14-34-6q-16 6-32 6z" fill="#EE9A7A" />
              <path d="M-20 -8q6 10 0 18M-4 -12q6 12 0 22M12 -8q6 10 0 18" stroke="#C76548" strokeWidth="2.5" fill="none" />
            </g>
          ))}
      {[[130, 150], [262, 128], [200, 206]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill={C.cheese} stroke="#D8C07A" />)}
      <g transform="translate(250 205) rotate(-20)"><path d="M-26 0a26 26 0 0 1 52 0z" fill="#F2D24B" /><path d="M-20 0a20 20 0 0 1 40 0z" fill="#F8E58A" /></g>
      <Leaf x={150} y={202} a={30} s={0.8} />
    </>
  );
}

function Tiramisu() {
  return (
    <>
      <ellipse cx="200" cy="234" rx="150" ry="18" fill="#000" opacity=".12" />
      <ellipse cx="200" cy="224" rx="148" ry="22" fill={C.plate} />
      <rect x="112" y="108" width="176" height="104" rx="6" fill={C.cream} />
      <rect x="112" y="150" width="176" height="14" fill="#8A5A3A" /><rect x="112" y="186" width="176" height="14" fill="#8A5A3A" />
      <rect x="112" y="98" width="176" height="18" rx="6" fill={C.cocoa} />
      {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={122 + ((i * 37) % 156)} cy={104 + ((i * 11) % 8)} r="2" fill="#6B4430" />)}
      <path d="M112 164h176" stroke="#00000010" />
    </>
  );
}

function PannaCotta() {
  return (
    <>
      <ellipse cx="200" cy="236" rx="140" ry="18" fill="#000" opacity=".12" />
      <ellipse cx="200" cy="224" rx="138" ry="22" fill={C.plate} />
      <path d="M126 214q-4-94 74-94q78 0 74 94z" fill="#FBF3E2" />
      <path d="M126 214q-4-94 74-94q78 0 74 94" fill="none" stroke="#E9DEC6" strokeWidth="3" />
      <path d="M142 150q58-52 120 0q-14 22-30 18q-12 20-30 8q-22 14-40-6q-14 4-20-20z" fill={C.berry} />
      {[[190, 118], [212, 112], [232, 122]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill={i === 1 ? C.tomato : C.berry} stroke="#7C2038" />)}
      <Leaf x={208} y={102} a={-30} s={0.7} />
    </>
  );
}

function Mousse() {
  return (
    <>
      <ellipse cx="200" cy="244" rx="86" ry="12" fill="#000" opacity=".12" />
      <path d="M132 86h136l-14 138q-2 14-16 14h-76q-14 0-16-14z" fill={C.glass} opacity=".9" />
      <path d="M142 116h116l-10 104q-1 8-10 8h-76q-9 0-10-8z" fill={C.cocoa} />
      <path d="M142 116q58 22 116 0" fill="none" stroke="#6B4430" strokeWidth="6" />
      <path d="M150 104q50-26 100 0q-6 14-50 16q-44-2-50-16z" fill="#F6EBD4" />
      <circle cx="200" cy="92" r="11" fill={C.berry} />
      <path d="M144 100v110" stroke="#fff" strokeWidth="4" opacity=".5" strokeLinecap="round" />
    </>
  );
}

function Dessert() {
  return (
    <>
      <ellipse cx="200" cy="236" rx="150" ry="18" fill="#000" opacity=".12" />
      <ellipse cx="200" cy="226" rx="148" ry="22" fill={C.plate} />
      <path d="M118 214l50-110h112l-18 110z" fill="#F8E7C4" />
      <path d="M126 196h156" stroke="#D96A4B" strokeWidth="14" /><path d="M134 170h134" stroke="#7C4A2A" strokeWidth="12" />
      <path d="M142 144h118" stroke="#F4DFA0" strokeWidth="10" />
      <path d="M168 104h112l-6 18h-104z" fill="#C98B3E" opacity=".6" />
      <circle cx="262" cy="98" r="9" fill={C.berry} stroke="#7C2038" />
    </>
  );
}

function Coffee({ seed }: { seed: string }) {
  const latte = /latte|cappuccino/.test(seed);
  return (
    <>
      <circle cx="200" cy="158" r="116" fill="#000" opacity=".1" />
      <circle cx="200" cy="152" r="114" fill={C.plate} />
      <circle cx="200" cy="152" r="96" fill="none" stroke="#E7DFCF" strokeWidth="4" />
      <path d="M284 126q38-6 34 28q-4 30-38 22" fill="none" stroke="#FFFDF8" strokeWidth="14" strokeLinecap="round" />
      <circle cx="196" cy="152" r="70" fill="#fff" stroke="#E7DFCF" strokeWidth="4" />
      <circle cx="196" cy="152" r="58" fill="#5B351F" />
      {latte ? <path d="M196 188q-34-24-26-42q8-16 26-2q18-14 26 2q8 18-26 42z" fill="#F3E3C8" /> : <circle cx="196" cy="152" r="48" fill="#7A4A2A" opacity=".55" />}
      <rect x="318" y="196" width="40" height="6" rx="3" fill={C.steel} transform="rotate(-24 318 196)" />
    </>
  );
}

function Espresso() {
  return (
    <>
      <circle cx="200" cy="158" r="100" fill="#000" opacity=".1" />
      <circle cx="200" cy="152" r="98" fill={C.plate} />
      <circle cx="200" cy="152" r="80" fill="none" stroke="#E7DFCF" strokeWidth="4" />
      <path d="M262 136q30-4 26 22q-4 22-30 16" fill="none" stroke="#FFFDF8" strokeWidth="11" strokeLinecap="round" />
      <circle cx="196" cy="152" r="50" fill="#fff" stroke="#E7DFCF" strokeWidth="4" />
      <circle cx="196" cy="152" r="40" fill="#3B2012" /><circle cx="196" cy="152" r="34" fill="#A3703F" opacity=".5" />
    </>
  );
}

function ColdCoffee() {
  return (
    <>
      <ellipse cx="200" cy="246" rx="80" ry="12" fill="#000" opacity=".12" />
      <path d="M140 58h120l-14 180q-1 10-12 10h-68q-11 0-12-10z" fill={C.glass} opacity=".9" />
      <path d="M148 110h104l-10 126q-1 6-8 6h-68q-7 0-8-6z" fill="#6B3F24" />
      <path d="M148 110h104l-3 36h-98z" fill="#C9A27A" />
      {[[168, 124], [200, 134], [228, 120], [182, 172]].map(([x, y], i) => <rect key={i} x={x - 14} y={y - 14} width="28" height="28" rx="6" fill="#fff" opacity=".55" transform={`rotate(${i * 14 - 10} ${x} ${y})`} />)}
      <rect x="214" y="30" width="9" height="150" rx="4" fill={C.tomato} transform="rotate(10 218 100)" />
      <path d="M152 66v156" stroke="#fff" strokeWidth="5" opacity=".55" strokeLinecap="round" />
    </>
  );
}

/** The Fort Kochi gable from the Canvas wordmark, lit at night. */
function Facade() {
  return (
    <>
      <circle cx="200" cy="170" r="88" fill={C.tomato} />
      <g fill="#FAF8F3">
        <path d="M70 300V150q0-10 10-10h30V118l22-8q10-34 38-34t38 34l22 8v22h30q10 0 10 10v150z" />
      </g>
      <g fill="#17150F">
        <path d="M164 300v-64q0-34 36-34t36 34v64z" />
        <rect x="90" y="176" width="32" height="44" rx="16" /><rect x="278" y="176" width="32" height="44" rx="16" />
        <path d="M180 118q0-22 20-22t20 22z" />
      </g>
      <g stroke="#FAF8F3" strokeWidth="2"><path d="M200 202v98M164 252h72" opacity=".5" /></g>
      <path d="M0 300h400v6H0z" fill={C.basil} />
    </>
  );
}

function Interior() {
  const r = rng("interior");
  return (
    <>
      <rect width="400" height="300" fill="#26231C" />
      {[90, 200, 310].map((x, i) => (
        <g key={i}><path d={`M${x - 36} 210V120q0-40 36-40t36 40v90z`} fill="#3A352B" /><path d={`M${x - 28} 210V122q0-32 28-32t28 32v88z`} fill="#F3C56A" opacity=".18" /></g>
      ))}
      <path d="M0 70q100 40 200 18t200-18" fill="none" stroke="#6B6252" strokeWidth="2" />
      {Array.from({ length: 14 }, (_, i) => <g key={i}><circle cx={14 + i * 28} cy={72 + Math.sin(i * 0.9 + 0.8) * 16 + 10} r="14" fill="#F3C56A" opacity=".2" /><circle cx={14 + i * 28} cy={72 + Math.sin(i * 0.9 + 0.8) * 16 + 10} r="4.5" fill="#FFE2A0" /></g>)}
      <rect y="222" width="400" height="78" fill="#3F2E1E" />
      {[70, 200, 330].map((x, i) => (
        <g key={i}><ellipse cx={x} cy={238 + (i % 2) * 6} rx="54" ry="12" fill="#6B4A2E" /><rect x={x - 4} y={246 + (i % 2) * 6} width="8" height="40" fill="#2C1E12" /><circle cx={x - 18 + r() * 8} cy={232 + (i % 2) * 6} r="5" fill="#FAF8F3" /><circle cx={x + 16} cy={236 + (i % 2) * 6} r="5" fill={C.tomato} /></g>
      ))}
    </>
  );
}

function Lane() {
  return (
    <>
      <rect width="400" height="300" fill="#CFDDDB" />
      <circle cx="318" cy="64" r="30" fill={C.ochre} />
      <path d="M0 300V120l90-12 40 30v162z" fill="#EFD6B2" /><path d="M270 300V100l130 22v178z" fill="#E6BBA3" />
      <path d="M130 300V150l60-30h20l60 30v150z" fill="#FAF8F3" />
      <rect x="170" y="180" width="60" height="120" rx="30" fill="#17150F" />
      {[[60, 160], [320, 160]].map(([x, y], i) => <rect key={i} x={x - 16} y={y} width="32" height="48" rx="16" fill="#2F5D3A" />)}
      <path d="M0 262h400v38H0z" fill="#B9A98F" />
      {[60, 340].map((x, i) => <g key={i}><circle cx={x} cy="246" r="18" fill={C.basil} /><rect x={x - 2} y="248" width="4" height="30" fill="#2C1E12" /></g>)}
    </>
  );
}

const SCENES: Record<ArtKind, (p: { seed: string }) => ReactNode> = {
  pizza: Pizza, calzone: Calzone, pasta: Pasta, lasagne: Lasagne, salad: Salad, steak: Steak, seafood: Seafood,
  tiramisu: Tiramisu, pannacotta: PannaCotta, mousse: Mousse, dessert: Dessert, coffee: Coffee, espresso: Espresso,
  coldcoffee: ColdCoffee, facade: Facade, interior: Interior, lane: Lane,
};

/** Pick an illustration for a menu item from its id and category. */
export const artForItem = (id: string, category: string): ArtKind => {
  if (id.includes("calzone")) return "calzone";
  if (id.includes("lasagne")) return "lasagne";
  if (id.includes("tiramisu")) return "tiramisu";
  if (id.includes("panna")) return "pannacotta";
  if (id.includes("mousse")) return "mousse";
  if (id.includes("cold-coffee")) return "coldcoffee";
  if (/ristretto|espresso/.test(id)) return "espresso";
  switch (category) {
    case "pizza": return "pizza";
    case "pasta": return "pasta";
    case "salads": return "salad";
    case "mains": return "steak";
    case "seafood": return "seafood";
    case "desserts": return id.includes("nutella") ? "pizza" : "dessert";
    default: return "coffee";
  }
};

interface ArtProps {
  kind: ArtKind;
  seed: string;
  label?: string;
  className?: string;
}

export function Art({ kind, seed, label, className }: ArtProps) {
  const Scene = SCENES[kind];
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill={BACKDROP[kind]} />
      <Scene seed={seed} />
    </svg>
  );
}
