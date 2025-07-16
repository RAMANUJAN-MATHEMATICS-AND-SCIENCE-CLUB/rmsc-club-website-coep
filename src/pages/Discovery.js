import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Discovery.css";

const discoveryData = {
  mathematics: {
    title: "Mathematical Wonders",
    icon: "🔢",
    color: "#667eea",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    facts: [
      {
        title: "The Golden Ratio",
        description:
          "The golden ratio (φ ≈ 1.618) appears everywhere in nature, from sunflower spirals to galaxy formations.",
        detail:
          "This mathematical constant has fascinated mathematicians for centuries and is found in art, architecture, and natural phenomena.",
        year: "Ancient Greece",
        category: "Number Theory",
      },
      {
        title: "Infinity Paradox",
        description:
          "There are different sizes of infinity! Some infinities are larger than others.",
        detail:
          "Georg Cantor proved that the set of real numbers is uncountably infinite, while integers are countably infinite.",
        year: "1874",
        category: "Set Theory",
      },
      {
        title: "Euler's Identity",
        description:
          "e^(iπ) + 1 = 0 - Called the most beautiful equation in mathematics.",
        detail:
          "This equation elegantly connects five fundamental mathematical constants: e, i, π, 1, and 0.",
        year: "1748",
        category: "Complex Analysis",
      },
      {
        title: "Fermat's Last Theorem",
        description:
          "No three positive integers a, b, and c satisfy a^n + b^n = c^n for any integer value of n > 2.",
        detail:
          "This theorem remained unproven for 358 years until Andrew Wiles solved it in 1995.",
        year: "1637-1995",
        category: "Number Theory",
      },
      {
        title: "Fibonacci Sequence",
        description:
          "Each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, 21...",
        detail:
          "This sequence appears in nature, from pinecone spirals to the arrangement of leaves on plants.",
        year: "1202",
        category: "Sequences",
      },
      {
        title: "Prime Number Theorem",
        description:
          "The distribution of prime numbers becomes more predictable for very large numbers.",
        detail:
          "The theorem describes how the gaps between prime numbers grow larger as numbers get bigger, yet maintains a predictable pattern.",
        year: "1896",
        category: "Number Theory",
      },
      {
        title: "Four Color Theorem",
        description:
          "Any map can be colored using only four colors so that no adjacent regions share the same color.",
        detail:
          "This was the first major theorem to be proved using computer assistance, verified by checking thousands of cases.",
        year: "1976",
        category: "Graph Theory",
      },
      {
        title: "Gödel's Incompleteness",
        description:
          "Any mathematical system complex enough to include arithmetic cannot prove all true statements within itself.",
        detail:
          "This revolutionary discovery showed fundamental limitations in mathematical systems and logic.",
        year: "1931",
        category: "Logic",
      },
      {
        title: "Chaos Theory",
        description:
          "Small changes in initial conditions can lead to dramatically different outcomes in complex systems.",
        detail:
          "The butterfly effect demonstrates how weather systems and other complex phenomena are inherently unpredictable.",
        year: "1960s",
        category: "Dynamical Systems",
      },
      {
        title: "Riemann Hypothesis",
        description:
          "One of the most important unsolved problems in mathematics concerning the distribution of prime numbers.",
        detail:
          "This hypothesis predicts the pattern of zeros in the Riemann zeta function and has deep implications for number theory.",
        year: "1859",
        category: "Number Theory",
      },
      {
        title: "Game Theory",
        description:
          "Mathematical framework for analyzing strategic decision-making between rational agents.",
        detail:
          "Developed by John von Neumann and applied in economics, politics, biology, and computer science.",
        year: "1944",
        category: "Applied Mathematics",
      },
      {
        title: "Topology",
        description:
          "Study of properties that remain unchanged under continuous deformations like stretching and bending.",
        detail:
          "A coffee cup and a donut are topologically equivalent because both have exactly one hole.",
        year: "1735",
        category: "Topology",
      },
      {
        title: "Fractals",
        description:
          "Geometric shapes that display self-similarity at all scales and have fractional dimensions.",
        detail:
          "The Mandelbrot set and coastlines are examples of fractals found in nature and mathematics.",
        year: "1975",
        category: "Geometry",
      },
      {
        title: "Boolean Algebra",
        description:
          "Mathematical system using only two values: true and false, fundamental to computer science.",
        detail:
          "George Boole's algebra of logic became the foundation for digital circuits and programming logic.",
        year: "1854",
        category: "Logic",
      },
      {
        title: "Calculus",
        description:
          "Mathematical study of change and motion through derivatives and integrals.",
        detail:
          "Independently developed by Newton and Leibniz, calculus revolutionized physics and engineering.",
        year: "1665-1676",
        category: "Analysis",
      },
      {
        title: "Group Theory",
        description:
          "Study of algebraic structures that capture symmetry in mathematical and physical systems.",
        detail:
          "Group theory explains the symmetries in crystals, particles, and geometric transformations.",
        year: "1830s",
        category: "Abstract Algebra",
      },
      {
        title: "Information Theory",
        description:
          "Mathematical framework for quantifying and transmitting information efficiently.",
        detail:
          "Claude Shannon's work laid the foundation for digital communication and data compression.",
        year: "1948",
        category: "Applied Mathematics",
      },
      {
        title: "Non-Euclidean Geometry",
        description:
          "Geometries that reject Euclid's parallel postulate, leading to curved spaces.",
        detail:
          "These geometries describe the structure of our universe and are essential for Einstein's relativity.",
        year: "1830s",
        category: "Geometry",
      },
      {
        title: "Complex Numbers",
        description:
          "Extension of real numbers that includes imaginary units, essential for advanced mathematics.",
        detail:
          "Complex numbers are fundamental in quantum mechanics, signal processing, and electrical engineering.",
        year: "1545",
        category: "Number Theory",
      },
    ],
  },
  physics: {
    title: "Physics Phenomena",
    icon: "⚛️",
    color: "#764ba2",
    gradient: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    facts: [
      {
        title: "Quantum Entanglement",
        description:
          "Particles can be mysteriously connected, affecting each other instantly across vast distances.",
        detail:
          "Einstein called it 'spooky action at a distance.' When one particle's state changes, its entangled partner changes too.",
        year: "1935",
        category: "Quantum Physics",
      },
      {
        title: "Time Dilation",
        description:
          "Time moves slower for objects moving at high speeds or in strong gravitational fields.",
        detail:
          "GPS satellites must account for relativistic effects, or they would be off by miles each day.",
        year: "1905",
        category: "Relativity",
      },
      {
        title: "Wave-Particle Duality",
        description:
          "Light and matter exhibit both wave and particle properties depending on how we observe them.",
        detail:
          "The double-slit experiment shows that electrons can act as waves, creating interference patterns.",
        year: "1909",
        category: "Quantum Physics",
      },
      {
        title: "Conservation of Energy",
        description:
          "Energy cannot be created or destroyed, only transformed from one form to another.",
        detail:
          "This fundamental law governs everything from chemical reactions to the expansion of the universe.",
        year: "1847",
        category: "Thermodynamics",
      },
      {
        title: "Heisenberg Uncertainty",
        description:
          "You cannot simultaneously know both the exact position and momentum of a particle.",
        detail:
          "This isn't a measurement limitation but a fundamental property of quantum mechanics.",
        year: "1927",
        category: "Quantum Physics",
      },
      {
        title: "Black Hole Physics",
        description:
          "Regions of spacetime where gravity is so strong that nothing, not even light, can escape.",
        detail:
          "Black holes warp space and time so extremely that they create event horizons - points of no return.",
        year: "1916-1916",
        category: "Relativity",
      },
      {
        title: "Superconductivity",
        description:
          "Materials that conduct electricity with zero resistance at very low temperatures.",
        detail:
          "Superconductors expel magnetic fields and enable technologies like MRI machines and maglev trains.",
        year: "1911",
        category: "Condensed Matter",
      },
      {
        title: "String Theory",
        description:
          "A theoretical framework where particles are one-dimensional strings rather than point particles.",
        detail:
          "String theory attempts to unify quantum mechanics and general relativity in a theory of everything.",
        year: "1970s",
        category: "Theoretical Physics",
      },
      {
        title: "Schrödinger's Cat",
        description:
          "A thought experiment illustrating the bizarre nature of quantum superposition.",
        detail:
          "The cat exists in a superposition of being both alive and dead until observed, highlighting quantum paradoxes.",
        year: "1935",
        category: "Quantum Physics",
      },
      {
        title: "Hawking Radiation",
        description:
          "Black holes emit radiation and slowly evaporate over astronomical time periods.",
        detail:
          "This discovery merged quantum mechanics with black hole physics, showing even black holes aren't permanent.",
        year: "1974",
        category: "Theoretical Physics",
      },
      {
        title: "Bose-Einstein Condensate",
        description:
          "A state of matter where atoms behave as a single quantum entity at extremely low temperatures.",
        detail:
          "This state demonstrates quantum mechanics on a macroscopic scale and enables precise atomic manipulation.",
        year: "1995",
        category: "Quantum Physics",
      },
      {
        title: "Antimatter",
        description:
          "Matter composed of antiparticles that annihilate with regular matter, releasing pure energy.",
        detail:
          "Antimatter is used in medical imaging and could potentially power future spacecraft.",
        year: "1928",
        category: "Particle Physics",
      },
      {
        title: "Nuclear Fusion",
        description:
          "Process where light atomic nuclei combine to form heavier nuclei, powering stars.",
        detail:
          "Fusion could provide clean, abundant energy and is the source of energy in our Sun.",
        year: "1938",
        category: "Nuclear Physics",
      },
      {
        title: "Laser Physics",
        description:
          "Light Amplification by Stimulated Emission of Radiation - coherent light beams.",
        detail:
          "Lasers revolutionized technology, enabling fiber optics, surgery, manufacturing, and entertainment.",
        year: "1960",
        category: "Optics",
      },
      {
        title: "Magnetic Resonance",
        description:
          "Quantum phenomenon where atomic nuclei absorb and emit electromagnetic radiation.",
        detail:
          "MRI technology uses magnetic resonance to create detailed images of the human body.",
        year: "1946",
        category: "Quantum Physics",
      },
      {
        title: "Plasma Physics",
        description:
          "Study of ionized gases where electrons are separated from atomic nuclei.",
        detail:
          "Plasma is the most common state of matter in the universe, found in stars and lightning.",
        year: "1920s",
        category: "Plasma Physics",
      },
      {
        title: "Quantum Tunneling",
        description:
          "Quantum effect where particles can pass through energy barriers they classically couldn't cross.",
        detail:
          "Tunneling enables nuclear fusion in stars and is essential for electronic devices.",
        year: "1928",
        category: "Quantum Physics",
      },
      {
        title: "Dark Energy",
        description:
          "Mysterious energy causing the accelerating expansion of the universe.",
        detail:
          "Dark energy makes up about 68% of the universe but its nature remains one of physics' greatest mysteries.",
        year: "1998",
        category: "Cosmology",
      },
      {
        title: "Photoelectric Effect",
        description:
          "Emission of electrons from materials when light shines on them, proving light's particle nature.",
        detail:
          "Einstein's explanation of this effect earned him the Nobel Prize and led to quantum theory.",
        year: "1905",
        category: "Quantum Physics",
      },
    ],
  },
  history: {
    title: "Scientific Milestones",
    icon: "🏛️",
    color: "#f093fb",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    facts: [
      {
        title: "Discovery of DNA Structure",
        description:
          "Watson, Crick, Franklin, and Wilkins revealed the double helix structure of DNA.",
        detail:
          "This discovery revolutionized biology and medicine, leading to genetic engineering and modern biotechnology.",
        year: "1953",
        category: "Biology",
      },
      {
        title: "Periodic Table Creation",
        description:
          "Dmitri Mendeleev organized elements by atomic weight, predicting unknown elements.",
        detail:
          "He left gaps for undiscovered elements and predicted their properties with remarkable accuracy.",
        year: "1869",
        category: "Chemistry",
      },
      {
        title: "Theory of Evolution",
        description:
          "Charles Darwin proposed that all species evolved from common ancestors through natural selection.",
        detail:
          "This theory unified biology and explained the diversity of life on Earth.",
        year: "1859",
        category: "Biology",
      },
      {
        title: "Galileo's Telescope",
        description:
          "First person to use a telescope for astronomical observations, discovering Jupiter's moons.",
        detail:
          "His observations supported the heliocentric model and changed our understanding of the cosmos.",
        year: "1609",
        category: "Astronomy",
      },
      {
        title: "Newton's Laws",
        description:
          "Isaac Newton formulated three laws of motion and the law of universal gravitation.",
        detail:
          "These laws explained planetary motion and laid the foundation for classical mechanics.",
        year: "1687",
        category: "Physics",
      },
      {
        title: "Discovery of Radioactivity",
        description:
          "Marie and Pierre Curie discovered that some elements spontaneously emit radiation.",
        detail:
          "This discovery led to nuclear physics, medical treatments, and our understanding of atomic structure.",
        year: "1896",
        category: "Physics",
      },
      {
        title: "Discovery of Antibiotics",
        description:
          "Alexander Fleming accidentally discovered penicillin, revolutionizing medicine.",
        detail:
          "This discovery has saved millions of lives and led to the development of modern antibiotics.",
        year: "1928",
        category: "Medicine",
      },
      {
        title: "Theory of Relativity",
        description:
          "Einstein's revolutionary theories changed our understanding of space, time, and gravity.",
        detail:
          "Special and general relativity transformed physics and predicted phenomena like black holes and GPS corrections.",
        year: "1905-1915",
        category: "Physics",
      },
      {
        title: "Discovery of X-Rays",
        description:
          "Wilhelm Röntgen accidentally discovered electromagnetic radiation that could see through soft tissue.",
        detail:
          "X-rays revolutionized medical diagnosis and led to numerous applications in science and industry.",
        year: "1895",
        category: "Physics",
      },
      {
        title: "Invention of the Computer",
        description:
          "Alan Turing and others laid the theoretical foundation for modern computers.",
        detail:
          "The concept of the universal computing machine transformed every aspect of modern life.",
        year: "1936-1940s",
        category: "Computer Science",
      },
      {
        title: "Discovery of the Electron",
        description:
          "J.J. Thomson discovered the first subatomic particle, revolutionizing atomic theory.",
        detail:
          "This discovery led to the understanding of atomic structure and electronic devices.",
        year: "1897",
        category: "Physics",
      },
      {
        title: "Invention of the Transistor",
        description:
          "Revolutionary electronic switch that enabled the digital age and modern electronics.",
        detail:
          "Transistors replaced vacuum tubes and made possible computers, smartphones, and the internet.",
        year: "1947",
        category: "Electronics",
      },
      {
        title: "Discovery of Vaccination",
        description:
          "Edward Jenner developed the first vaccine, saving millions of lives from smallpox.",
        detail:
          "Vaccination became one of medicine's greatest achievements, eradicating diseases worldwide.",
        year: "1796",
        category: "Medicine",
      },
      {
        title: "Invention of the Steam Engine",
        description:
          "James Watt's improvements sparked the Industrial Revolution and modern transportation.",
        detail:
          "Steam power transformed manufacturing, transportation, and society in the 18th and 19th centuries.",
        year: "1769",
        category: "Engineering",
      },
      {
        title: "Discovery of Electromagnetic Induction",
        description:
          "Michael Faraday discovered how to generate electricity from magnetism.",
        detail:
          "This principle powers generators, transformers, and electric motors that run our modern world.",
        year: "1831",
        category: "Physics",
      },
      {
        title: "Invention of Photography",
        description:
          "First permanent photographs captured light and preserved moments in time.",
        detail:
          "Photography revolutionized art, journalism, science, and how we document human history.",
        year: "1826",
        category: "Technology",
      },
      {
        title: "Discovery of Germ Theory",
        description:
          "Louis Pasteur proved that diseases are caused by microorganisms, not miasma.",
        detail:
          "This discovery led to sterilization, pasteurization, and modern antiseptic practices.",
        year: "1860s",
        category: "Medicine",
      },
      {
        title: "Invention of the Printing Press",
        description:
          "Gutenberg's movable type revolutionized the spread of knowledge and literacy.",
        detail:
          "The printing press enabled the Renaissance, Reformation, and Scientific Revolution.",
        year: "1440",
        category: "Technology",
      },
      {
        title: "Discovery of the Structure of Benzene",
        description:
          "August Kekulé's dream-inspired discovery of benzene's ring structure.",
        detail:
          "This breakthrough launched organic chemistry and the modern chemical industry.",
        year: "1865",
        category: "Chemistry",
      },
    ],
  },
  chemistry: {
    title: "Chemical Wonders",
    icon: "🧪",
    color: "#a8edea",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    facts: [
      {
        title: "Water's Unique Properties",
        description:
          "Water is less dense as ice than liquid, which is why ice floats and life exists.",
        detail:
          "This unusual property protects aquatic life during winter and drives weather patterns.",
        year: "Always",
        category: "Properties",
      },
      {
        title: "Carbon's Versatility",
        description:
          "Carbon can form more compounds than all other elements combined.",
        detail:
          "Its ability to form four bonds allows for complex molecules essential to life.",
        year: "Ancient",
        category: "Organic Chemistry",
      },
      {
        title: "Catalysis",
        description:
          "Catalysts speed up reactions without being consumed, making industrial processes possible.",
        detail:
          "Enzymes in our bodies are biological catalysts that make life processes occur at body temperature.",
        year: "1836",
        category: "Reaction Kinetics",
      },
      {
        title: "Atomic Theory",
        description:
          "John Dalton proposed that matter consists of indivisible atoms with specific properties.",
        detail:
          "This theory explained chemical reactions and laid the groundwork for modern chemistry.",
        year: "1808",
        category: "Atomic Theory",
      },
      {
        title: "Chemical Bonding",
        description:
          "Atoms bond by sharing or transferring electrons to achieve stable electron configurations.",
        detail:
          "Understanding bonding explains why certain combinations of elements form specific compounds.",
        year: "1916",
        category: "Bonding Theory",
      },
      {
        title: "The pH Scale",
        description:
          "A logarithmic scale measuring the acidity or basicity of aqueous solutions.",
        detail:
          "pH stands for 'potential of hydrogen' and ranges from 0 (most acidic) to 14 (most basic).",
        year: "1909",
        category: "Acid-Base Chemistry",
      },
      {
        title: "Crystalline Structures",
        description:
          "Atoms arrange in repeating patterns forming beautiful crystal lattices.",
        detail:
          "Different crystal structures give materials unique properties, from diamond's hardness to graphite's conductivity.",
        year: "Ancient",
        category: "Solid State Chemistry",
      },
      {
        title: "Chemical Equilibrium",
        description:
          "In reversible reactions, forward and reverse rates become equal, creating dynamic balance.",
        detail:
          "Le Chatelier's principle predicts how equilibrium shifts when conditions change.",
        year: "1884",
        category: "Physical Chemistry",
      },
      {
        title: "Polymers and Plastics",
        description:
          "Large molecules made of repeating units that form the basis of life and modern materials.",
        detail:
          "From DNA to plastic bottles, polymers are everywhere and have revolutionized technology.",
        year: "1920s",
        category: "Polymer Chemistry",
      },
      {
        title: "Electrochemistry",
        description:
          "Chemical reactions that involve the transfer of electrons between substances.",
        detail:
          "This field enables batteries, fuel cells, and electroplating technologies.",
        year: "1780s",
        category: "Electrochemistry",
      },
      {
        title: "Thermodynamics in Chemistry",
        description:
          "Study of energy changes in chemical reactions and phase transitions.",
        detail:
          "Chemical thermodynamics predicts reaction spontaneity and equilibrium conditions.",
        year: "1850s",
        category: "Physical Chemistry",
      },
      {
        title: "Spectroscopy",
        description:
          "Analysis of matter through its interaction with electromagnetic radiation.",
        detail:
          "Spectroscopy reveals molecular structure and enables identification of unknown compounds.",
        year: "1859",
        category: "Analytical Chemistry",
      },
      {
        title: "Coordination Chemistry",
        description:
          "Study of metal complexes with coordinate bonds to ligands.",
        detail:
          "Coordination compounds are essential in catalysis, medicine, and materials science.",
        year: "1893",
        category: "Inorganic Chemistry",
      },
      {
        title: "Chirality",
        description:
          "Property of molecules that are non-superimposable mirror images of each other.",
        detail:
          "Chiral molecules have identical physical properties but can have vastly different biological effects.",
        year: "1848",
        category: "Stereochemistry",
      },
      {
        title: "Green Chemistry",
        description:
          "Design of chemical processes that reduce environmental impact and waste.",
        detail:
          "Green chemistry principles guide sustainable manufacturing and pollution prevention.",
        year: "1990s",
        category: "Environmental Chemistry",
      },
      {
        title: "Supramolecular Chemistry",
        description:
          "Study of molecular assemblies held together by non-covalent interactions.",
        detail:
          "This field explains protein folding, DNA structure, and enables nanotechnology applications.",
        year: "1960s",
        category: "Supramolecular Chemistry",
      },
      {
        title: "Computational Chemistry",
        description:
          "Use of computer simulations to solve chemical problems and predict molecular behavior.",
        detail:
          "Quantum mechanical calculations help design new drugs and materials before synthesis.",
        year: "1970s",
        category: "Theoretical Chemistry",
      },
      {
        title: "Photochemistry",
        description:
          "Study of chemical reactions initiated by light absorption.",
        detail:
          "Photochemistry explains photosynthesis, vision, and enables solar energy conversion.",
        year: "1912",
        category: "Physical Chemistry",
      },
      {
        title: "Isotope Chemistry",
        description:
          "Study of chemical and physical differences between isotopes of the same element.",
        detail:
          "Isotopes are used in dating artifacts, medical imaging, and nuclear power generation.",
        year: "1913",
        category: "Nuclear Chemistry",
      },
    ],
  },
  astronomy: {
    title: "Astronomical Discoveries",
    icon: "🌌",
    color: "#ff6b6b",
    gradient: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
    facts: [
      {
        title: "The Big Bang Theory",
        description:
          "The universe began from an extremely hot, dense point about 13.8 billion years ago.",
        detail:
          "Evidence includes cosmic microwave background radiation and the observed expansion of the universe.",
        year: "1927-1965",
        category: "Cosmology",
      },
      {
        title: "Dark Matter",
        description:
          "Invisible matter that makes up about 85% of all matter in the universe.",
        detail:
          "We can detect dark matter through its gravitational effects on visible matter and light.",
        year: "1933",
        category: "Cosmology",
      },
      {
        title: "Exoplanets",
        description:
          "Planets orbiting stars outside our solar system, with thousands discovered so far.",
        detail:
          "Some exoplanets might have conditions suitable for life as we know it.",
        year: "1992",
        category: "Planetary Science",
      },
      {
        title: "Gravitational Waves",
        description:
          "Ripples in spacetime caused by accelerating massive objects like colliding black holes.",
        detail:
          "First directly detected in 2015, confirming Einstein's prediction from 100 years earlier.",
        year: "2015",
        category: "Gravitational Physics",
      },
      {
        title: "Pulsars",
        description:
          "Rapidly rotating neutron stars that emit beams of radiation like cosmic lighthouses.",
        detail:
          "Pulsars are so precise they can be used as cosmic clocks for navigation and timing.",
        year: "1967",
        category: "Stellar Physics",
      },
      {
        title: "Cosmic Microwave Background",
        description:
          "Leftover radiation from the Big Bang that fills the entire universe.",
        detail:
          "This radiation provides a snapshot of the universe when it was only 380,000 years old.",
        year: "1965",
        category: "Cosmology",
      },
      {
        title: "Supernovae",
        description:
          "Explosive deaths of massive stars that forge heavy elements and seed space with metals.",
        detail:
          "Supernovae create elements heavier than iron and can outshine entire galaxies.",
        year: "185 AD",
        category: "Stellar Physics",
      },
      {
        title: "Quasars",
        description:
          "Extremely luminous galactic cores powered by supermassive black holes.",
        detail:
          "Quasars are among the most distant and energetic objects in the observable universe.",
        year: "1963",
        category: "Galactic Astronomy",
      },
      {
        title: "Solar Wind",
        description:
          "Stream of charged particles flowing from the Sun throughout the solar system.",
        detail:
          "Solar wind shapes planetary magnetospheres and creates auroras on Earth.",
        year: "1958",
        category: "Solar Physics",
      },
      {
        title: "Galaxy Formation",
        description:
          "Process by which dark matter and gas collapsed to form the first galaxies.",
        detail:
          "Galaxies evolved from small fluctuations in the early universe into today's cosmic structures.",
        year: "1920s",
        category: "Cosmology",
      },
      {
        title: "Asteroid Belt",
        description:
          "Region between Mars and Jupiter containing rocky remnants from solar system formation.",
        detail:
          "The asteroid belt holds clues to early solar system history and poses potential impact threats.",
        year: "1801",
        category: "Planetary Science",
      },
      {
        title: "Red Giant Phase",
        description:
          "Late evolutionary stage when stars expand and cool as they exhaust core hydrogen.",
        detail:
          "Our Sun will become a red giant in about 5 billion years, possibly engulfing Earth.",
        year: "1920s",
        category: "Stellar Evolution",
      },
      {
        title: "Hubble's Law",
        description:
          "Observation that distant galaxies are receding with velocities proportional to their distance.",
        detail:
          "This discovery provided the first evidence for universal expansion and the Big Bang theory.",
        year: "1929",
        category: "Cosmology",
      },
      {
        title: "Interstellar Medium",
        description:
          "Gas and dust that fills the space between stars in galaxies.",
        detail:
          "This tenuous material is the birthplace of new stars and contains complex organic molecules.",
        year: "1930s",
        category: "Galactic Astronomy",
      },
      {
        title: "Planetary Rings",
        description:
          "Disk-like structures of ice and rock particles orbiting gas giant planets.",
        detail:
          "Saturn's rings are the most spectacular, but all gas giants have ring systems.",
        year: "1610",
        category: "Planetary Science",
      },
      {
        title: "White Dwarf Stars",
        description:
          "Dense stellar remnants left behind when Sun-like stars exhaust their nuclear fuel.",
        detail:
          "White dwarfs are incredibly dense - a teaspoon would weigh as much as a car on Earth.",
        year: "1862",
        category: "Stellar Physics",
      },
      {
        title: "Galactic Rotation",
        description:
          "Discovery that galaxies rotate but with unexpected patterns revealing dark matter.",
        detail:
          "Galaxy rotation curves provided crucial evidence for the existence of dark matter.",
        year: "1970s",
        category: "Galactic Astronomy",
      },
      {
        title: "Cosmic Inflation",
        description:
          "Rapid exponential expansion of space in the first fraction of a second after the Big Bang.",
        detail:
          "Inflation explains the universe's large-scale uniformity and flatness.",
        year: "1980",
        category: "Cosmology",
      },
      {
        title: "Magnetospheres",
        description:
          "Magnetic fields around planets that deflect charged particles from solar wind.",
        detail:
          "Earth's magnetosphere protects us from harmful solar radiation and creates auroras.",
        year: "1958",
        category: "Planetary Science",
      },
    ],
  },
  biology: {
    title: "Biological Wonders",
    icon: "🧬",
    color: "#4ecdc4",
    gradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
    facts: [
      {
        title: "DNA Replication",
        description:
          "The process by which DNA makes exact copies of itself during cell division.",
        detail:
          "DNA polymerase can copy genetic information with incredible accuracy, making only about 1 error per billion bases.",
        year: "1958",
        category: "Molecular Biology",
      },
      {
        title: "Photosynthesis",
        description:
          "Plants convert sunlight, carbon dioxide, and water into glucose and oxygen.",
        detail:
          "This process provides energy for most life on Earth and produces the oxygen we breathe.",
        year: "Ancient",
        category: "Plant Biology",
      },
      {
        title: "CRISPR Gene Editing",
        description:
          "A revolutionary tool that allows precise editing of DNA sequences in living cells.",
        detail:
          "CRISPR enables treatment of genetic diseases and advancement of biological research.",
        year: "2012",
        category: "Biotechnology",
      },
      {
        title: "Neural Networks",
        description:
          "The brain's interconnected network of neurons processes and stores information.",
        detail:
          "Human brains contain about 86 billion neurons forming trillions of connections.",
        year: "1890s",
        category: "Neuroscience",
      },
      {
        title: "Enzyme Catalysis",
        description:
          "Biological catalysts that speed up chemical reactions essential for life.",
        detail:
          "Enzymes can increase reaction rates by factors of millions while remaining unchanged.",
        year: "1833",
        category: "Biochemistry",
      },
      {
        title: "Cell Theory",
        description:
          "Fundamental principle that all living things are composed of cells.",
        detail:
          "This theory established that cells are the basic unit of life and all cells come from existing cells.",
        year: "1838",
        category: "Cell Biology",
      },
      {
        title: "Protein Folding",
        description:
          "Process by which proteins assume their functional three-dimensional structure.",
        detail:
          "Protein misfolding is linked to diseases like Alzheimer's and Parkinson's.",
        year: "1950s",
        category: "Structural Biology",
      },
      {
        title: "Mitochondrial Evolution",
        description:
          "Theory that mitochondria evolved from ancient bacterial symbionts.",
        detail:
          "This endosymbiotic relationship transformed early cells and enabled complex life.",
        year: "1967",
        category: "Evolutionary Biology",
      },
      {
        title: "Genetic Code",
        description:
          "Universal system by which DNA sequences specify amino acid sequences in proteins.",
        detail:
          "The genetic code is nearly universal across all life forms, suggesting common ancestry.",
        year: "1961",
        category: "Molecular Biology",
      },
      {
        title: "Homeostasis",
        description:
          "Biological process that maintains stable internal conditions despite external changes.",
        detail:
          "Homeostasis regulates body temperature, blood sugar, and pH in living organisms.",
        year: "1865",
        category: "Physiology",
      },
      {
        title: "Immunology",
        description:
          "Study of the immune system's defense mechanisms against pathogens.",
        detail:
          "Understanding immunity led to vaccines, organ transplantation, and cancer immunotherapy.",
        year: "1798",
        category: "Immunology",
      },
      {
        title: "Stem Cells",
        description:
          "Undifferentiated cells capable of developing into various specialized cell types.",
        detail:
          "Stem cell research offers potential treatments for spinal injuries, diabetes, and heart disease.",
        year: "1961",
        category: "Developmental Biology",
      },
      {
        title: "Biodiversity",
        description:
          "Variety of life forms at genetic, species, and ecosystem levels.",
        detail:
          "Earth hosts an estimated 8.7 million species, with most still undiscovered.",
        year: "1980s",
        category: "Ecology",
      },
      {
        title: "Symbiosis",
        description:
          "Close biological relationships between different species living together.",
        detail:
          "Symbiotic relationships range from mutualistic partnerships to parasitic exploitation.",
        year: "1879",
        category: "Ecology",
      },
      {
        title: "Epigenetics",
        description:
          "Heritable changes in gene expression that don't involve DNA sequence changes.",
        detail:
          "Environmental factors can influence gene expression and be passed to offspring.",
        year: "1940s",
        category: "Genetics",
      },
      {
        title: "Circadian Rhythms",
        description:
          "Internal biological clocks that regulate daily cycles in organisms.",
        detail:
          "Circadian rhythms control sleep-wake cycles and are disrupted by shift work and jet lag.",
        year: "1729",
        category: "Chronobiology",
      },
      {
        title: "Microbiome",
        description:
          "Community of microorganisms living in and on the human body.",
        detail:
          "The human microbiome influences digestion, immunity, and mental health.",
        year: "2000s",
        category: "Microbiology",
      },
      {
        title: "Metamorphosis",
        description:
          "Dramatic transformation in body structure during an organism's life cycle.",
        detail:
          "Complete metamorphosis in insects involves egg, larva, pupa, and adult stages.",
        year: "Ancient",
        category: "Developmental Biology",
      },
      {
        title: "Bioluminescence",
        description:
          "Production of light by living organisms through chemical reactions.",
        detail:
          "Fireflies, deep-sea fish, and fungi use bioluminescence for communication and predation.",
        year: "1887",
        category: "Biochemistry",
      },
    ],
  },
};

function Discovery() {
  const [activeCategory, setActiveCategory] = useState("mathematics");
  const [selectedFact, setSelectedFact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomFact, setRandomFact] = useState(null);
  const [likedFacts, setLikedFacts] = useState(new Set());
  const [viewedFacts, setViewedFacts] = useState(new Set());
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [achievements, setAchievements] = useState(new Set());

  const searchInputRef = useRef(null);
  const confettiRef = useRef(null);

  const categories = Object.keys(discoveryData);

  // Use useMemo for activeFacts to prevent dependency issues
  const activeFacts = useMemo(() => {
    return discoveryData[activeCategory]?.facts || [];
  }, [activeCategory]);

  // Filter facts based on search term
  const filteredFacts = useMemo(() => {
    if (!searchTerm) return activeFacts;
    return activeFacts.filter(
      (fact) =>
        fact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fact.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeFacts, searchTerm]);

  // Generate random fact on component mount and rotate daily
  useEffect(() => {
    const allFacts = Object.values(discoveryData).flatMap(
      (category) => category.facts
    );
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("discoveryFactDate");
    const savedIndex = localStorage.getItem("discoveryFactIndex");

    if (savedDate === today && savedIndex) {
      setRandomFact(allFacts[parseInt(savedIndex)]);
    } else {
      const newIndex = Math.floor(Math.random() * allFacts.length);
      setRandomFact(allFacts[newIndex]);
      localStorage.setItem("discoveryFactDate", today);
      localStorage.setItem("discoveryFactIndex", newIndex.toString());
    }
  }, []);

  // Load user preferences
  useEffect(() => {
    const savedLikes = localStorage.getItem("discoveryLikedFacts");
    const savedViewed = localStorage.getItem("discoveryViewedFacts");
    const savedAchievements = localStorage.getItem("discoveryAchievements");

    if (savedLikes) setLikedFacts(new Set(JSON.parse(savedLikes)));
    if (savedViewed) setViewedFacts(new Set(JSON.parse(savedViewed)));
    if (savedAchievements)
      setAchievements(new Set(JSON.parse(savedAchievements)));
  }, []);

  // Achievement system
  const checkAchievements = useCallback(() => {
    const newAchievements = new Set(achievements);

    if (likedFacts.size >= 5 && !achievements.has("fact-lover")) {
      newAchievements.add("fact-lover");
      showAchievement("Fact Lover!", "You've liked 5 facts!");
    }

    if (viewedFacts.size >= 10 && !achievements.has("explorer")) {
      newAchievements.add("explorer");
      showAchievement("Explorer!", "You've viewed 10 facts!");
    }

    if (interactionCount >= 50 && !achievements.has("super-active")) {
      newAchievements.add("super-active");
      showAchievement("Super Active!", "You've made 50 interactions!");
    }

    if (newAchievements.size > achievements.size) {
      setAchievements(newAchievements);
      localStorage.setItem(
        "discoveryAchievements",
        JSON.stringify([...newAchievements])
      );
    }
  }, [achievements, likedFacts.size, viewedFacts.size, interactionCount]);

  const showAchievement = (title, message) => {
    setShowConfetti(true);
    // Create achievement notification
    const notification = document.createElement("div");
    notification.className = "achievement-notification";
    notification.innerHTML = `
      <div class="achievement-content">
        <h3>🏆 ${title}</h3>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      setShowConfetti(false);
    }, 3000);
  };

  // Interactive functions
  const toggleLike = useCallback(
    (factTitle) => {
      const newLikedFacts = new Set(likedFacts);
      if (newLikedFacts.has(factTitle)) {
        newLikedFacts.delete(factTitle);
      } else {
        newLikedFacts.add(factTitle);
      }
      setLikedFacts(newLikedFacts);
      setInteractionCount((prev) => prev + 1);
      localStorage.setItem(
        "discoveryLikedFacts",
        JSON.stringify([...newLikedFacts])
      );

      // Play sound effect (simulated)
      playSound("like");
    },
    [likedFacts]
  );

  const markAsViewed = useCallback(
    (factTitle) => {
      const newViewedFacts = new Set(viewedFacts);
      newViewedFacts.add(factTitle);
      setViewedFacts(newViewedFacts);
      localStorage.setItem(
        "discoveryViewedFacts",
        JSON.stringify([...newViewedFacts])
      );
    },
    [viewedFacts]
  );

  const playSound = (type) => {
    // Simulate sound effects
    if (type === "like") {
      console.log("🔊 Like sound played");
    } else if (type === "modal") {
      console.log("🔊 Modal sound played");
    } else if (type === "quiz") {
      console.log("🔊 Quiz sound played");
    }
  };

  const startQuiz = () => {
    const allFacts = Object.values(discoveryData).flatMap(
      (category) => category.facts
    );
    const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
    // Quiz functionality can be expanded later
    setInteractionCount((prev) => prev + 1);
    playSound("quiz");
    alert(`Quiz Mode: What year was "${randomFact.title}" discovered?`);
  };

  const openModal = useCallback(
    (fact) => {
      setSelectedFact(fact);
      setIsModalOpen(true);
      markAsViewed(fact.title);
      setInteractionCount((prev) => prev + 1);
      playSound("modal");
    },
    [markAsViewed]
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFact(null);
  };

  const shuffleRandomFact = () => {
    const allFacts = Object.values(discoveryData).flatMap(
      (category) => category.facts
    );
    const newIndex = Math.floor(Math.random() * allFacts.length);
    setRandomFact(allFacts[newIndex]);
    setInteractionCount((prev) => prev + 1);
  };

  // Check achievements when dependencies change
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isModalOpen && e.key === "Escape") {
        closeModal();
      }
      if (e.key === "/" && !isModalOpen) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
      if (e.key === "r" && e.ctrlKey && !isModalOpen) {
        e.preventDefault();
        shuffleRandomFact();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  return (
    <div className="discovery-page">
      {/* Hero Section */}
      <motion.section
        className="discovery-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="discovery-hero-content">
          <motion.h1
            className="discovery-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discovery Hub
          </motion.h1>
          <motion.p
            className="discovery-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore fascinating facts about mathematics, science, and historical
            discoveries
          </motion.p>
        </div>
        <div className="discovery-hero-background"></div>
      </motion.section>

      {/* Random Fact of the Day */}
      {randomFact && (
        <motion.section
          className="fact-of-day"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="fact-of-day-content">
            <div className="fact-of-day-header">
              <h2>🎯 Fact of the Day</h2>
              <div className="fact-controls">
                <motion.button
                  className="shuffle-btn"
                  onClick={shuffleRandomFact}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  title="Get new random fact (Ctrl+R)"
                >
                  🎲
                </motion.button>
                <motion.button
                  className="quiz-btn"
                  onClick={startQuiz}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Start quiz mode"
                >
                  🧠 Quiz
                </motion.button>
              </div>
            </div>
            <motion.div
              className="random-fact-card interactive"
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => openModal(randomFact)}
            >
              <div className="fact-interactions">
                <motion.button
                  className={`like-btn ${
                    likedFacts.has(randomFact.title) ? "liked" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(randomFact.title);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  title="Like this fact"
                >
                  {likedFacts.has(randomFact.title) ? "❤️" : "🤍"}
                </motion.button>
                {viewedFacts.has(randomFact.title) && (
                  <span
                    className="viewed-badge"
                    title="You've viewed this fact"
                  >
                    👁️
                  </span>
                )}
              </div>
              <h3>{randomFact.title}</h3>
              <p>{randomFact.description}</p>
              <div className="fact-footer">
                <span className="fact-category">{randomFact.category}</span>
                <span className="click-hint">Click to explore →</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Search Bar */}
      <motion.section
        className="discovery-search"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="search-container">
          <div className="search-header">
            <h3>🔍 Explore & Discover</h3>
            <div className="search-stats">
              <span className="stat-badge">👀 {viewedFacts.size} viewed</span>
              <span className="stat-badge">❤️ {likedFacts.size} liked</span>
              <span className="stat-badge">
                🏆 {achievements.size} achievements
              </span>
            </div>
          </div>
          <div className={`search-box ${isSearchFocused ? "focused" : ""}`}>
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search discoveries, facts, or categories... (Press / to focus)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchTerm && (
              <motion.button
                className="clear-search"
                onClick={() => setSearchTerm("")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                ✕
              </motion.button>
            )}
          </div>
          <div className="keyboard-hint">
            <span>
              💡 Tips: Press <kbd>/</kbd> to search, <kbd>Ctrl+R</kbd> for new
              fact
            </span>
          </div>
        </div>
      </motion.section>

      {/* Category Navigation */}
      <motion.section
        className="discovery-categories"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="category-nav">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
              style={{ "--category-color": discoveryData[category].color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="category-icon">
                {discoveryData[category].icon}
              </span>
              <span className="category-name">
                {discoveryData[category].title}
              </span>
              <span className="fact-count">
                ({discoveryData[category].facts.length})
              </span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Facts Grid */}
      <motion.section
        className="discovery-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="facts-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-header">
              <h2>
                <span className="section-icon">
                  {discoveryData[activeCategory].icon}
                </span>
                {discoveryData[activeCategory].title}
              </h2>
              <p>Discover amazing facts and historical milestones</p>
            </div>

            <div className="facts-grid">
              {filteredFacts.map((fact, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  className={`fact-card interactive ${
                    viewedFacts.has(fact.title) ? "viewed" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal(fact)}
                >
                  <div className="fact-card-interactions">
                    <motion.button
                      className={`like-btn ${
                        likedFacts.has(fact.title) ? "liked" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(fact.title);
                      }}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      whileTap={{ scale: 0.8 }}
                      title="Like this fact"
                    >
                      {likedFacts.has(fact.title) ? "❤️" : "🤍"}
                    </motion.button>
                    {viewedFacts.has(fact.title) && (
                      <motion.span
                        className="viewed-badge"
                        title="You've viewed this fact"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.6 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>

                  <div className="fact-card-header">
                    <h3>{fact.title}</h3>
                    <span className="fact-year">{fact.year}</span>
                  </div>

                  <p className="fact-description">{fact.description}</p>

                  <div className="fact-card-footer">
                    <span className="fact-category-tag">{fact.category}</span>
                    <motion.button
                      className="learn-more-btn"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        animate={{
                          x: likedFacts.has(fact.title) ? [0, 5, 0] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: likedFacts.has(fact.title) ? Infinity : 0,
                        }}
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </motion.button>
                  </div>

                  {/* Progress indicator */}
                  <div className="fact-progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${((index + 1) / filteredFacts.length) * 100}%`,
                        backgroundColor: discoveryData[activeCategory].color,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredFacts.length === 0 && searchTerm && (
              <div className="no-results">
                <h3>No facts found</h3>
                <p>
                  Try searching with different keywords or explore other
                  categories.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="discovery-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="stats-container">
          <motion.div
            className="stat-item interactive"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h3
              key={Object.values(discoveryData).reduce(
                (total, cat) => total + cat.facts.length,
                0
              )}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6 }}
            >
              {Object.values(discoveryData).reduce(
                (total, cat) => total + cat.facts.length,
                0
              )}
            </motion.h3>
            <p>Amazing Facts</p>
            <div className="stat-progress">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    (likedFacts.size /
                      Object.values(discoveryData).reduce(
                        (total, cat) => total + cat.facts.length,
                        0
                      )) *
                    100
                  }%`,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="stat-item interactive"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h3
              key={categories.length}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
            >
              {categories.length}
            </motion.h3>
            <p>Categories</p>
            <div className="category-dots">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat}
                  className={`category-dot ${
                    activeCategory === cat ? "active" : ""
                  }`}
                  style={{ backgroundColor: discoveryData[cat].color }}
                  whileHover={{ scale: 1.3 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="stat-item interactive"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h3
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
            >
              500+
            </motion.h3>
            <p>Years of History</p>
            <div className="timeline-dots">
              {[1600, 1700, 1800, 1900, 2000].map((year, idx) => (
                <motion.div
                  key={year}
                  className="timeline-dot"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="stat-item interactive special"
            whileHover={{ scale: 1.05, y: -5, rotate: [0, 5, -5, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h3
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.3 }}
            >
              ∞
            </motion.h3>
            <p>Possibilities</p>
            <motion.div
              className="infinity-symbol"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ♾️
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Detailed Fact Modal */}
      <AnimatePresence>
        {isModalOpen && selectedFact && (
          <motion.div
            className="fact-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="fact-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="modal-header">
                <h2>{selectedFact.title}</h2>
                <div className="modal-meta">
                  <span className="modal-year">{selectedFact.year}</span>
                  <span className="modal-category">
                    {selectedFact.category}
                  </span>
                </div>
              </div>

              <div className="modal-body">
                <h3>Overview</h3>
                <p className="modal-description">{selectedFact.description}</p>

                <h3>Detailed Information</h3>
                <p className="modal-detail">{selectedFact.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container" ref={confettiRef}>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti-piece"
              initial={{
                y: -100,
                x: Math.random() * window.innerWidth,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: "easeOut",
                delay: Math.random() * 0.5,
              }}
              style={{
                backgroundColor: ["#667eea", "#764ba2", "#f093fb", "#a8edea"][
                  Math.floor(Math.random() * 4)
                ],
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive Footer */}
      <motion.section
        className="discovery-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="footer-content">
          <div className="interaction-summary">
            <h3>Your Discovery Journey 🚀</h3>
            <div className="journey-stats">
              <div className="journey-item">
                <span className="journey-icon">👁️</span>
                <span>{viewedFacts.size} facts explored</span>
              </div>
              <div className="journey-item">
                <span className="journey-icon">❤️</span>
                <span>{likedFacts.size} facts loved</span>
              </div>
              <div className="journey-item">
                <span className="journey-icon">🎯</span>
                <span>{interactionCount} interactions</span>
              </div>
              <div className="journey-item">
                <span className="journey-icon">🏆</span>
                <span>{achievements.size} achievements unlocked</span>
              </div>
            </div>
          </div>

          <div className="discovery-actions">
            <motion.button
              className="action-btn primary"
              onClick={startQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🧠 Challenge Yourself
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={shuffleRandomFact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎲 Surprise Me
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Discovery;
