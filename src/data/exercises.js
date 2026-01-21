// At-home bodyweight exercises database
// Focused on weight loss and full-body fitness
// French translations included

export const MUSCLE_GROUPS = {
    UPPER: 'upper',
    LOWER: 'lower',
    CORE: 'core',
    FULL_BODY: 'full_body',
    CARDIO: 'cardio'
};

export const DIFFICULTY = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3
};

export const exercises = [
    // === CARDIO / HIIT ===
    {
        id: 'jumping_jacks',
        name: 'Jumping Jacks',
        nameFr: 'Sauts en étoile',
        muscleGroup: MUSCLE_GROUPS.CARDIO,
        difficulty: DIFFICULTY.BEGINNER,
        duration: 45,
        isTimeBased: true,
        calories: 10,
        description: 'Jump while spreading legs and raising arms overhead',
        descriptionFr: 'Sauter en écartant les jambes et levant les bras',
        instructions: [
            'Debout, pieds joints, bras le long du corps',
            'Sauter en écartant les jambes et levant les bras au-dessus de la tête',
            'Revenir à la position initiale',
            'Garder un rythme régulier'
        ]
    },
    {
        id: 'high_knees',
        name: 'High Knees',
        nameFr: 'Montées de genoux',
        muscleGroup: MUSCLE_GROUPS.CARDIO,
        difficulty: DIFFICULTY.BEGINNER,
        duration: 30,
        isTimeBased: true,
        calories: 12,
        description: 'Run in place, bringing knees up high',
        instructions: [
            'Debout, pieds écartés largeur des hanches',
            'Courir sur place en montant les genoux vers la poitrine',
            'Balancer les bras en rythme',
            'Atterrir doucement sur la pointe des pieds'
        ]
    },
    {
        id: 'burpees',
        name: 'Burpees',
        nameFr: 'Burpees',
        muscleGroup: MUSCLE_GROUPS.FULL_BODY,
        difficulty: DIFFICULTY.ADVANCED,
        reps: 10,
        isTimeBased: false,
        calories: 15,
        description: 'Full-body explosive movement',
        instructions: [
            'Debout, pieds largeur des épaules',
            'S\'accroupir et poser les mains au sol',
            'Sauter les pieds en arrière en position planche',
            'Faire une pompe, ramener les pieds et exploser vers le haut'
        ]
    },
    {
        id: 'mountain_climbers',
        name: 'Mountain Climbers',
        nameFr: 'Grimpeur',
        muscleGroup: MUSCLE_GROUPS.CARDIO,
        difficulty: DIFFICULTY.INTERMEDIATE,
        duration: 30,
        isTimeBased: true,
        calories: 12,
        description: 'Plank position with alternating knee drives',
        instructions: [
            'Commencer en position planche, bras tendus',
            'Ramener un genou vers la poitrine',
            'Alterner rapidement les jambes comme si vous couriez',
            'Garder les hanches basses et le ventre serré'
        ]
    },
    {
        id: 'butt_kicks',
        name: 'Butt Kicks',
        nameFr: 'Talons-fesses',
        muscleGroup: MUSCLE_GROUPS.CARDIO,
        difficulty: DIFFICULTY.BEGINNER,
        duration: 30,
        isTimeBased: true,
        calories: 8,
        description: 'Run in place, kicking heels to glutes',
        instructions: [
            'Debout, pieds largeur des hanches',
            'Courir sur place en ramenant les talons aux fessiers',
            'Garder les genoux vers le bas',
            'Balancer les bras naturellement'
        ]
    },

    // === UPPER BODY ===
    {
        id: 'push_ups',
        name: 'Push-Ups',
        nameFr: 'Pompes',
        muscleGroup: MUSCLE_GROUPS.UPPER,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 15,
        isTimeBased: false,
        calories: 8,
        description: 'Classic chest and tricep builder',
        instructions: [
            'Position planche, mains largeur des épaules',
            'Descendre la poitrine vers le sol, coudes à 45°',
            'Remonter en position initiale',
            'Garder le corps bien droit'
        ]
    },
    {
        id: 'knee_push_ups',
        name: 'Knee Push-Ups',
        nameFr: 'Pompes sur les genoux',
        muscleGroup: MUSCLE_GROUPS.UPPER,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 12,
        isTimeBased: false,
        calories: 5,
        description: 'Modified push-up for beginners',
        instructions: [
            'Sur les genoux, mains largeur des épaules',
            'Descendre la poitrine vers le sol',
            'Remonter en poussant',
            'Garder le ventre gainé'
        ]
    },
    {
        id: 'diamond_push_ups',
        name: 'Diamond Push-Ups',
        nameFr: 'Pompes diamant',
        muscleGroup: MUSCLE_GROUPS.UPPER,
        difficulty: DIFFICULTY.ADVANCED,
        reps: 10,
        isTimeBased: false,
        calories: 10,
        description: 'Tricep-focused push-up variation',
        instructions: [
            'Former un losange avec les mains sous la poitrine',
            'Descendre la poitrine vers les mains',
            'Remonter en contractant les triceps',
            'Garder les coudes près du corps'
        ]
    },
    {
        id: 'pike_push_ups',
        name: 'Pike Push-Ups',
        nameFr: 'Pompes piquées',
        muscleGroup: MUSCLE_GROUPS.UPPER,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 10,
        isTimeBased: false,
        calories: 8,
        description: 'Shoulder-focused push-up',
        instructions: [
            'Position du chien tête en bas',
            'Plier les coudes et baisser la tête vers le sol',
            'Remonter en position initiale',
            'Garder les hanches hautes'
        ]
    },
    {
        id: 'tricep_dips',
        name: 'Tricep Dips',
        nameFr: 'Dips triceps',
        muscleGroup: MUSCLE_GROUPS.UPPER,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 12,
        isTimeBased: false,
        calories: 6,
        description: 'Use a chair or edge for this tricep exercise',
        instructions: [
            'S\'asseoir au bord d\'une chaise, mains agrippant le bord',
            'Glisser en avant, poids sur les bras',
            'Descendre en pliant les coudes à 90°',
            'Remonter en position initiale'
        ]
    },
    {
        id: 'arm_circles',
        name: 'Arm Circles',
        nameFr: 'Cercles de bras',
        muscleGroup: MUSCLE_GROUPS.UPPER,
        difficulty: DIFFICULTY.BEGINNER,
        duration: 30,
        isTimeBased: true,
        calories: 3,
        description: 'Warm up and tone shoulders',
        instructions: [
            'Debout, bras tendus sur les côtés',
            'Faire de petits cercles vers l\'avant pendant 15 secondes',
            'Inverser le sens pendant 15 secondes',
            'Augmenter progressivement la taille des cercles'
        ]
    },

    // === LOWER BODY ===
    {
        id: 'squats',
        name: 'Squats',
        nameFr: 'Squats',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 20,
        isTimeBased: false,
        calories: 8,
        description: 'Fundamental lower body exercise',
        instructions: [
            'Debout, pieds largeur des épaules',
            'Descendre les hanches comme pour s\'asseoir',
            'Garder la poitrine haute, genoux au-dessus des orteils',
            'Pousser sur les talons pour remonter'
        ]
    },
    {
        id: 'jump_squats',
        name: 'Jump Squats',
        nameFr: 'Squats sautés',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 15,
        isTimeBased: false,
        calories: 12,
        description: 'Explosive squat variation',
        instructions: [
            'Faire un squat classique',
            'Exploser vers le haut en sautant',
            'Atterrir doucement et enchaîner',
            'Garder le ventre gainé'
        ]
    },
    {
        id: 'lunges',
        name: 'Lunges',
        nameFr: 'Fentes avant',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 20,
        isTimeBased: false,
        calories: 8,
        description: 'Alternating forward lunges',
        instructions: [
            'Debout, mains sur les hanches',
            'Faire un pas en avant, descendre jusqu\'à 90° aux deux genoux',
            'Revenir en position initiale',
            'Alterner les jambes'
        ]
    },
    {
        id: 'reverse_lunges',
        name: 'Reverse Lunges',
        nameFr: 'Fentes arrière',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 16,
        isTimeBased: false,
        calories: 7,
        description: 'Step back instead of forward',
        instructions: [
            'Debout, pieds joints',
            'Faire un pas en arrière et descendre en fente',
            'Pousser sur le talon avant pour revenir',
            'Alterner les jambes'
        ]
    },
    {
        id: 'glute_bridges',
        name: 'Glute Bridges',
        nameFr: 'Pont fessier',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 15,
        isTimeBased: false,
        calories: 5,
        description: 'Lie down and lift hips for glute activation',
        instructions: [
            'Allongé sur le dos, genoux pliés, pieds à plat',
            'Pousser sur les talons pour lever les hanches',
            'Serrer les fessiers en haut',
            'Redescendre avec contrôle'
        ]
    },
    {
        id: 'calf_raises',
        name: 'Calf Raises',
        nameFr: 'Élévations mollets',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 20,
        isTimeBased: false,
        calories: 4,
        description: 'Rise up on toes to work calves',
        instructions: [
            'Debout, pieds largeur des hanches',
            'Monter sur la pointe des pieds',
            'Tenir brièvement en haut',
            'Redescendre lentement'
        ]
    },
    {
        id: 'wall_sit',
        name: 'Wall Sit',
        nameFr: 'Chaise au mur',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.INTERMEDIATE,
        duration: 45,
        isTimeBased: true,
        calories: 6,
        description: 'Static hold against wall',
        instructions: [
            'Dos contre le mur',
            'Glisser jusqu\'à ce que les cuisses soient parallèles au sol',
            'Garder les genoux à 90°',
            'Tenir la position'
        ]
    },
    {
        id: 'sumo_squats',
        name: 'Sumo Squats',
        nameFr: 'Squats sumo',
        muscleGroup: MUSCLE_GROUPS.LOWER,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 15,
        isTimeBased: false,
        calories: 7,
        description: 'Wide-stance squat targeting inner thighs',
        instructions: [
            'Debout, pieds très écartés, orteils vers l\'extérieur',
            'Descendre les hanches, poitrine haute',
            'Pousser sur les talons pour remonter',
            'Serrer les fessiers en haut'
        ]
    },

    // === CORE ===
    {
        id: 'plank',
        name: 'Plank',
        nameFr: 'Planche',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.BEGINNER,
        duration: 45,
        isTimeBased: true,
        calories: 5,
        description: 'Static core hold',
        instructions: [
            'Position pompe, sur les avant-bras',
            'Corps droit de la tête aux talons',
            'Gainer le ventre, serrer les fessiers',
            'Tenir en respirant régulièrement'
        ]
    },
    {
        id: 'side_plank',
        name: 'Side Plank',
        nameFr: 'Planche latérale',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.INTERMEDIATE,
        duration: 30,
        isTimeBased: true,
        calories: 4,
        description: 'Side plank for obliques (each side)',
        instructions: [
            'Sur le côté, avant-bras au sol',
            'Lever les hanches pour former une ligne droite',
            'Empiler les pieds ou les décaler',
            'Tenir puis changer de côté'
        ]
    },
    {
        id: 'crunches',
        name: 'Crunches',
        nameFr: 'Crunchs',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 20,
        isTimeBased: false,
        calories: 5,
        description: 'Basic ab crunch',
        instructions: [
            'Allongé sur le dos, genoux pliés',
            'Mains derrière la tête',
            'Décoller les épaules du sol en gainant',
            'Redescendre avec contrôle'
        ]
    },
    {
        id: 'bicycle_crunches',
        name: 'Bicycle Crunches',
        nameFr: 'Crunchs bicyclette',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 30,
        isTimeBased: false,
        calories: 8,
        description: 'Rotating crunch for obliques',
        instructions: [
            'Allongé, mains derrière la tête',
            'Ramener un genou vers la poitrine en tournant le coude opposé',
            'Alterner en pédalant',
            'Garder le bas du dos au sol'
        ]
    },
    {
        id: 'leg_raises',
        name: 'Leg Raises',
        nameFr: 'Relevés de jambes',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 12,
        isTimeBased: false,
        calories: 6,
        description: 'Lower ab focused exercise',
        instructions: [
            'Allongé sur le dos, jambes tendues',
            'Garder le bas du dos au sol',
            'Lever les jambes à 90 degrés',
            'Redescendre lentement sans toucher le sol'
        ]
    },
    {
        id: 'russian_twists',
        name: 'Russian Twists',
        nameFr: 'Rotations russes',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 30,
        isTimeBased: false,
        calories: 7,
        description: 'Seated rotation for obliques',
        instructions: [
            'Assis, genoux pliés, légèrement penché en arrière',
            'Lever les pieds du sol (optionnel)',
            'Tourner le buste de chaque côté',
            'Toucher le sol à côté de la hanche'
        ]
    },
    {
        id: 'dead_bug',
        name: 'Dead Bug',
        nameFr: 'Insecte mort',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 16,
        isTimeBased: false,
        calories: 5,
        description: 'Core stability exercise',
        instructions: [
            'Allongé, bras tendus, genoux à 90°',
            'Tendre le bras et la jambe opposés vers le sol',
            'Revenir et alterner',
            'Garder le bas du dos au sol'
        ]
    },
    {
        id: 'flutter_kicks',
        name: 'Flutter Kicks',
        nameFr: 'Battements de jambes',
        muscleGroup: MUSCLE_GROUPS.CORE,
        difficulty: DIFFICULTY.INTERMEDIATE,
        duration: 30,
        isTimeBased: true,
        calories: 7,
        description: 'Alternating leg kicks for lower abs',
        instructions: [
            'Allongé, mains sous les fessiers',
            'Lever légèrement les jambes du sol',
            'Alterner les battements de haut en bas',
            'Garder des mouvements petits et contrôlés'
        ]
    },

    // === FULL BODY ===
    {
        id: 'bear_crawl',
        name: 'Bear Crawl',
        nameFr: 'Marche de l\'ours',
        muscleGroup: MUSCLE_GROUPS.FULL_BODY,
        difficulty: DIFFICULTY.INTERMEDIATE,
        duration: 30,
        isTimeBased: true,
        calories: 10,
        description: 'Crawl forward and backward',
        instructions: [
            'À quatre pattes, genoux décollés',
            'Avancer main et pied opposés ensemble',
            'Garder les hanches basses et le dos droit',
            'Avancer puis reculer'
        ]
    },
    {
        id: 'inchworm',
        name: 'Inchworm',
        nameFr: 'Chenille',
        muscleGroup: MUSCLE_GROUPS.FULL_BODY,
        difficulty: DIFFICULTY.BEGINNER,
        reps: 8,
        isTimeBased: false,
        calories: 6,
        description: 'Walk hands out and back',
        instructions: [
            'Debout, se pencher pour toucher le sol',
            'Marcher les mains jusqu\'à la position planche',
            'Ramener les mains vers les pieds',
            'Se relever et recommencer'
        ]
    },
    {
        id: 'squat_to_press',
        name: 'Squat to Press',
        nameFr: 'Squat press',
        muscleGroup: MUSCLE_GROUPS.FULL_BODY,
        difficulty: DIFFICULTY.INTERMEDIATE,
        reps: 12,
        isTimeBased: false,
        calories: 9,
        description: 'Squat with overhead arm extension',
        instructions: [
            'Debout, mains aux épaules',
            'Faire un squat contrôlé',
            'Se relever et pousser les bras au-dessus de la tête',
            'Ramener les mains aux épaules et recommencer'
        ]
    },
    {
        id: 'plank_jacks',
        name: 'Plank Jacks',
        nameFr: 'Jumping jack en planche',
        muscleGroup: MUSCLE_GROUPS.FULL_BODY,
        difficulty: DIFFICULTY.INTERMEDIATE,
        duration: 30,
        isTimeBased: true,
        calories: 10,
        description: 'Jumping jacks in plank position',
        instructions: [
            'Commencer en position planche',
            'Sauter les pieds vers l\'extérieur',
            'Ramener les pieds ensemble',
            'Garder le ventre gainé'
        ]
    }
];

// Workout templates based on focus areas (with French names)
export const WORKOUT_TYPES = [
    { id: 'full_body', name: 'Full Body', nameFr: 'Corps complet', icon: '💪', muscleGroups: ['full_body', 'upper', 'lower', 'core'] },
    { id: 'upper_body', name: 'Upper Body', nameFr: 'Haut du corps', icon: '🏋️', muscleGroups: ['upper'] },
    { id: 'lower_body', name: 'Lower Body', nameFr: 'Bas du corps', icon: '🦵', muscleGroups: ['lower'] },
    { id: 'core', name: 'Core Blast', nameFr: 'Abdos', icon: '🔥', muscleGroups: ['core'] },
    { id: 'cardio', name: 'Cardio HIIT', nameFr: 'Cardio HIIT', icon: '❤️‍🔥', muscleGroups: ['cardio', 'full_body'] }
];

// Weekly rotation for balanced training
export const WEEKLY_ROTATION = [
    'full_body',    // Lundi
    'upper_body',   // Mardi
    'cardio',       // Mercredi
    'lower_body',   // Jeudi
    'core',         // Vendredi
    'full_body',    // Samedi
    'cardio'        // Dimanche
];
