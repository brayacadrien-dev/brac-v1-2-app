
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated, Easing, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const COLORS = { bg:'#08080B', bg2:'#0D0D12', card:'#11121A', card2:'#171827', border:'#2B2147', violet:'#8A2BE2', violet2:'#A855F7', blue:'#3B82F6', text:'#FFFFFF', muted:'#A1A1AA', green:'#22C55E', red:'#EF4444', amber:'#F59E0B' };
const EXERCISES = [
  {
    "id": "ex1",
    "group": "Polyarticulaire",
    "name": "Air squat",
    "type": "poly"
  },
  {
    "id": "ex2",
    "group": "Polyarticulaire",
    "name": "Arraché / Snatch",
    "type": "poly"
  },
  {
    "id": "ex3",
    "group": "Polyarticulaire",
    "name": "Assault bike",
    "type": "poly"
  },
  {
    "id": "ex4",
    "group": "Polyarticulaire",
    "name": "Back squat",
    "type": "poly"
  },
  {
    "id": "ex5",
    "group": "Polyarticulaire",
    "name": "Bench press",
    "type": "poly"
  },
  {
    "id": "ex6",
    "group": "Polyarticulaire",
    "name": "Box jump",
    "type": "poly"
  },
  {
    "id": "ex7",
    "group": "Polyarticulaire",
    "name": "Burpees",
    "type": "poly"
  },
  {
    "id": "ex8",
    "group": "Polyarticulaire",
    "name": "Clean",
    "type": "poly"
  },
  {
    "id": "ex9",
    "group": "Polyarticulaire",
    "name": "Clean & Jerk",
    "type": "poly"
  },
  {
    "id": "ex10",
    "group": "Polyarticulaire",
    "name": "Course à pied",
    "type": "poly"
  },
  {
    "id": "ex11",
    "group": "Polyarticulaire",
    "name": "Deadlift",
    "type": "poly"
  },
  {
    "id": "ex12",
    "group": "Polyarticulaire",
    "name": "Dips",
    "type": "poly"
  },
  {
    "id": "ex13",
    "group": "Polyarticulaire",
    "name": "Farmer walk",
    "type": "poly"
  },
  {
    "id": "ex14",
    "group": "Polyarticulaire",
    "name": "Front squat",
    "type": "poly"
  },
  {
    "id": "ex15",
    "group": "Polyarticulaire",
    "name": "Goblet squat",
    "type": "poly"
  },
  {
    "id": "ex16",
    "group": "Polyarticulaire",
    "name": "Handstand push-up",
    "type": "poly"
  },
  {
    "id": "ex17",
    "group": "Polyarticulaire",
    "name": "Hip thrust",
    "type": "poly"
  },
  {
    "id": "ex18",
    "group": "Polyarticulaire",
    "name": "Jump squat",
    "type": "poly"
  },
  {
    "id": "ex19",
    "group": "Polyarticulaire",
    "name": "Kettlebell swing",
    "type": "poly"
  },
  {
    "id": "ex20",
    "group": "Polyarticulaire",
    "name": "Lunges",
    "type": "poly"
  },
  {
    "id": "ex21",
    "group": "Polyarticulaire",
    "name": "Muscle-up",
    "type": "poly"
  },
  {
    "id": "ex22",
    "group": "Polyarticulaire",
    "name": "Overhead squat",
    "type": "poly"
  },
  {
    "id": "ex23",
    "group": "Polyarticulaire",
    "name": "Push jerk",
    "type": "poly"
  },
  {
    "id": "ex24",
    "group": "Polyarticulaire",
    "name": "Push press",
    "type": "poly"
  },
  {
    "id": "ex25",
    "group": "Polyarticulaire",
    "name": "Rameur",
    "type": "poly"
  },
  {
    "id": "ex26",
    "group": "Polyarticulaire",
    "name": "SkiErg",
    "type": "poly"
  },
  {
    "id": "ex27",
    "group": "Polyarticulaire",
    "name": "Soulevé de terre sumo",
    "type": "poly"
  },
  {
    "id": "ex28",
    "group": "Polyarticulaire",
    "name": "Strict press",
    "type": "poly"
  },
  {
    "id": "ex29",
    "group": "Polyarticulaire",
    "name": "Thruster",
    "type": "poly"
  },
  {
    "id": "ex30",
    "group": "Polyarticulaire",
    "name": "Toes to bar",
    "type": "poly"
  },
  {
    "id": "ex31",
    "group": "Polyarticulaire",
    "name": "Tractions",
    "type": "poly"
  },
  {
    "id": "ex32",
    "group": "Polyarticulaire",
    "name": "Wall ball",
    "type": "poly"
  },
  {
    "id": "ex33",
    "group": "Polyarticulaire",
    "name": "Walking lunge",
    "type": "poly"
  },
  {
    "id": "ex34",
    "group": "Pectoraux",
    "name": "Développé couché barre",
    "type": "mono"
  },
  {
    "id": "ex35",
    "group": "Pectoraux",
    "name": "Développé couché haltères",
    "type": "mono"
  },
  {
    "id": "ex36",
    "group": "Pectoraux",
    "name": "Développé incliné barre",
    "type": "mono"
  },
  {
    "id": "ex37",
    "group": "Pectoraux",
    "name": "Développé incliné haltères",
    "type": "mono"
  },
  {
    "id": "ex38",
    "group": "Pectoraux",
    "name": "Développé décliné",
    "type": "mono"
  },
  {
    "id": "ex39",
    "group": "Pectoraux",
    "name": "Écarté couché",
    "type": "mono"
  },
  {
    "id": "ex40",
    "group": "Pectoraux",
    "name": "Écarté incliné",
    "type": "mono"
  },
  {
    "id": "ex41",
    "group": "Pectoraux",
    "name": "Écarté poulie haute",
    "type": "mono"
  },
  {
    "id": "ex42",
    "group": "Pectoraux",
    "name": "Écarté poulie basse",
    "type": "mono"
  },
  {
    "id": "ex43",
    "group": "Pectoraux",
    "name": "Pec deck",
    "type": "mono"
  },
  {
    "id": "ex44",
    "group": "Pectoraux",
    "name": "Pompes",
    "type": "mono"
  },
  {
    "id": "ex45",
    "group": "Pectoraux",
    "name": "Pompes lestées",
    "type": "mono"
  },
  {
    "id": "ex46",
    "group": "Pectoraux",
    "name": "Pompes diamant",
    "type": "mono"
  },
  {
    "id": "ex47",
    "group": "Pectoraux",
    "name": "Dips pectoraux",
    "type": "mono"
  },
  {
    "id": "ex48",
    "group": "Pectoraux",
    "name": "Pullover haltère",
    "type": "mono"
  },
  {
    "id": "ex49",
    "group": "Pectoraux",
    "name": "Chest press machine",
    "type": "mono"
  },
  {
    "id": "ex50",
    "group": "Pectoraux",
    "name": "Svend press",
    "type": "mono"
  },
  {
    "id": "ex51",
    "group": "Pectoraux",
    "name": "Landmine press unilatéral",
    "type": "mono"
  },
  {
    "id": "ex52",
    "group": "Dos",
    "name": "Traction pronation",
    "type": "mono"
  },
  {
    "id": "ex53",
    "group": "Dos",
    "name": "Traction supination",
    "type": "mono"
  },
  {
    "id": "ex54",
    "group": "Dos",
    "name": "Traction neutre",
    "type": "mono"
  },
  {
    "id": "ex55",
    "group": "Dos",
    "name": "Tirage vertical",
    "type": "mono"
  },
  {
    "id": "ex56",
    "group": "Dos",
    "name": "Tirage poitrine",
    "type": "mono"
  },
  {
    "id": "ex57",
    "group": "Dos",
    "name": "Tirage nuque",
    "type": "mono"
  },
  {
    "id": "ex58",
    "group": "Dos",
    "name": "Rowing barre",
    "type": "mono"
  },
  {
    "id": "ex59",
    "group": "Dos",
    "name": "Rowing haltère",
    "type": "mono"
  },
  {
    "id": "ex60",
    "group": "Dos",
    "name": "Rowing T-bar",
    "type": "mono"
  },
  {
    "id": "ex61",
    "group": "Dos",
    "name": "Rowing poulie basse",
    "type": "mono"
  },
  {
    "id": "ex62",
    "group": "Dos",
    "name": "Rowing machine",
    "type": "mono"
  },
  {
    "id": "ex63",
    "group": "Dos",
    "name": "Pull-over poulie",
    "type": "mono"
  },
  {
    "id": "ex64",
    "group": "Dos",
    "name": "Dead row",
    "type": "mono"
  },
  {
    "id": "ex65",
    "group": "Dos",
    "name": "Seal row",
    "type": "mono"
  },
  {
    "id": "ex66",
    "group": "Dos",
    "name": "Shrugs barre",
    "type": "mono"
  },
  {
    "id": "ex67",
    "group": "Dos",
    "name": "Shrugs haltères",
    "type": "mono"
  },
  {
    "id": "ex68",
    "group": "Dos",
    "name": "Extension lombaire",
    "type": "mono"
  },
  {
    "id": "ex69",
    "group": "Dos",
    "name": "Good morning",
    "type": "mono"
  },
  {
    "id": "ex70",
    "group": "Dos",
    "name": "Rack pull",
    "type": "mono"
  },
  {
    "id": "ex71",
    "group": "Dos",
    "name": "Face pull dos",
    "type": "mono"
  },
  {
    "id": "ex72",
    "group": "Épaules",
    "name": "Développé militaire",
    "type": "mono"
  },
  {
    "id": "ex73",
    "group": "Épaules",
    "name": "Développé haltères",
    "type": "mono"
  },
  {
    "id": "ex74",
    "group": "Épaules",
    "name": "Développé Arnold",
    "type": "mono"
  },
  {
    "id": "ex75",
    "group": "Épaules",
    "name": "Push press",
    "type": "mono"
  },
  {
    "id": "ex76",
    "group": "Épaules",
    "name": "Élévations latérales",
    "type": "mono"
  },
  {
    "id": "ex77",
    "group": "Épaules",
    "name": "Élévations frontales",
    "type": "mono"
  },
  {
    "id": "ex78",
    "group": "Épaules",
    "name": "Oiseau haltères",
    "type": "mono"
  },
  {
    "id": "ex79",
    "group": "Épaules",
    "name": "Oiseau poulie",
    "type": "mono"
  },
  {
    "id": "ex80",
    "group": "Épaules",
    "name": "Face pull",
    "type": "mono"
  },
  {
    "id": "ex81",
    "group": "Épaules",
    "name": "Upright row",
    "type": "mono"
  },
  {
    "id": "ex82",
    "group": "Épaules",
    "name": "Y raise",
    "type": "mono"
  },
  {
    "id": "ex83",
    "group": "Épaules",
    "name": "L raise",
    "type": "mono"
  },
  {
    "id": "ex84",
    "group": "Épaules",
    "name": "Reverse pec deck",
    "type": "mono"
  },
  {
    "id": "ex85",
    "group": "Épaules",
    "name": "Rotation externe élastique",
    "type": "mono"
  },
  {
    "id": "ex86",
    "group": "Épaules",
    "name": "Rotation interne élastique",
    "type": "mono"
  },
  {
    "id": "ex87",
    "group": "Épaules",
    "name": "Shrug trapèze",
    "type": "mono"
  },
  {
    "id": "ex88",
    "group": "Épaules",
    "name": "Landmine shoulder press",
    "type": "mono"
  },
  {
    "id": "ex89",
    "group": "Biceps",
    "name": "Curl barre",
    "type": "mono"
  },
  {
    "id": "ex90",
    "group": "Biceps",
    "name": "Curl EZ",
    "type": "mono"
  },
  {
    "id": "ex91",
    "group": "Biceps",
    "name": "Curl haltères",
    "type": "mono"
  },
  {
    "id": "ex92",
    "group": "Biceps",
    "name": "Curl incliné",
    "type": "mono"
  },
  {
    "id": "ex93",
    "group": "Biceps",
    "name": "Curl marteau",
    "type": "mono"
  },
  {
    "id": "ex94",
    "group": "Biceps",
    "name": "Curl pupitre",
    "type": "mono"
  },
  {
    "id": "ex95",
    "group": "Biceps",
    "name": "Curl concentration",
    "type": "mono"
  },
  {
    "id": "ex96",
    "group": "Biceps",
    "name": "Curl câble",
    "type": "mono"
  },
  {
    "id": "ex97",
    "group": "Biceps",
    "name": "Curl spider",
    "type": "mono"
  },
  {
    "id": "ex98",
    "group": "Biceps",
    "name": "Curl inversé",
    "type": "mono"
  },
  {
    "id": "ex99",
    "group": "Biceps",
    "name": "Curl Zottman",
    "type": "mono"
  },
  {
    "id": "ex100",
    "group": "Biceps",
    "name": "Curl Bayesian",
    "type": "mono"
  },
  {
    "id": "ex101",
    "group": "Biceps",
    "name": "Curl 21",
    "type": "mono"
  },
  {
    "id": "ex102",
    "group": "Biceps",
    "name": "Traction supination stricte",
    "type": "mono"
  },
  {
    "id": "ex103",
    "group": "Triceps",
    "name": "Extension poulie corde",
    "type": "mono"
  },
  {
    "id": "ex104",
    "group": "Triceps",
    "name": "Extension poulie barre",
    "type": "mono"
  },
  {
    "id": "ex105",
    "group": "Triceps",
    "name": "Barre au front",
    "type": "mono"
  },
  {
    "id": "ex106",
    "group": "Triceps",
    "name": "Extension nuque haltère",
    "type": "mono"
  },
  {
    "id": "ex107",
    "group": "Triceps",
    "name": "Extension unilatérale",
    "type": "mono"
  },
  {
    "id": "ex108",
    "group": "Triceps",
    "name": "Kickback triceps",
    "type": "mono"
  },
  {
    "id": "ex109",
    "group": "Triceps",
    "name": "Dips banc",
    "type": "mono"
  },
  {
    "id": "ex110",
    "group": "Triceps",
    "name": "Pompes serrées",
    "type": "mono"
  },
  {
    "id": "ex111",
    "group": "Triceps",
    "name": "JM press",
    "type": "mono"
  },
  {
    "id": "ex112",
    "group": "Triceps",
    "name": "Tate press",
    "type": "mono"
  },
  {
    "id": "ex113",
    "group": "Triceps",
    "name": "Extension câble au-dessus tête",
    "type": "mono"
  },
  {
    "id": "ex114",
    "group": "Triceps",
    "name": "Close grip bench press",
    "type": "mono"
  },
  {
    "id": "ex115",
    "group": "Quadriceps",
    "name": "Squat arrière",
    "type": "mono"
  },
  {
    "id": "ex116",
    "group": "Quadriceps",
    "name": "Squat avant",
    "type": "mono"
  },
  {
    "id": "ex117",
    "group": "Quadriceps",
    "name": "Hack squat",
    "type": "mono"
  },
  {
    "id": "ex118",
    "group": "Quadriceps",
    "name": "Presse à cuisses",
    "type": "mono"
  },
  {
    "id": "ex119",
    "group": "Quadriceps",
    "name": "Leg extension",
    "type": "mono"
  },
  {
    "id": "ex120",
    "group": "Quadriceps",
    "name": "Split squat bulgare",
    "type": "mono"
  },
  {
    "id": "ex121",
    "group": "Quadriceps",
    "name": "Fente avant",
    "type": "mono"
  },
  {
    "id": "ex122",
    "group": "Quadriceps",
    "name": "Fente arrière",
    "type": "mono"
  },
  {
    "id": "ex123",
    "group": "Quadriceps",
    "name": "Fente marchée",
    "type": "mono"
  },
  {
    "id": "ex124",
    "group": "Quadriceps",
    "name": "Step-up",
    "type": "mono"
  },
  {
    "id": "ex125",
    "group": "Quadriceps",
    "name": "Sissy squat",
    "type": "mono"
  },
  {
    "id": "ex126",
    "group": "Quadriceps",
    "name": "Goblet squat",
    "type": "mono"
  },
  {
    "id": "ex127",
    "group": "Quadriceps",
    "name": "Zercher squat",
    "type": "mono"
  },
  {
    "id": "ex128",
    "group": "Quadriceps",
    "name": "Belt squat",
    "type": "mono"
  },
  {
    "id": "ex129",
    "group": "Quadriceps",
    "name": "Cyclist squat",
    "type": "mono"
  },
  {
    "id": "ex130",
    "group": "Ischios",
    "name": "Soulevé de terre jambes tendues",
    "type": "mono"
  },
  {
    "id": "ex131",
    "group": "Ischios",
    "name": "Romanian deadlift",
    "type": "mono"
  },
  {
    "id": "ex132",
    "group": "Ischios",
    "name": "Leg curl assis",
    "type": "mono"
  },
  {
    "id": "ex133",
    "group": "Ischios",
    "name": "Leg curl couché",
    "type": "mono"
  },
  {
    "id": "ex134",
    "group": "Ischios",
    "name": "Leg curl debout",
    "type": "mono"
  },
  {
    "id": "ex135",
    "group": "Ischios",
    "name": "Nordic curl",
    "type": "mono"
  },
  {
    "id": "ex136",
    "group": "Ischios",
    "name": "Good morning",
    "type": "mono"
  },
  {
    "id": "ex137",
    "group": "Ischios",
    "name": "Glute ham raise",
    "type": "mono"
  },
  {
    "id": "ex138",
    "group": "Ischios",
    "name": "Hip hinge élastique",
    "type": "mono"
  },
  {
    "id": "ex139",
    "group": "Ischios",
    "name": "Kettlebell RDL",
    "type": "mono"
  },
  {
    "id": "ex140",
    "group": "Ischios",
    "name": "Single leg RDL",
    "type": "mono"
  },
  {
    "id": "ex141",
    "group": "Fessiers",
    "name": "Hip thrust",
    "type": "mono"
  },
  {
    "id": "ex142",
    "group": "Fessiers",
    "name": "Glute bridge",
    "type": "mono"
  },
  {
    "id": "ex143",
    "group": "Fessiers",
    "name": "Abduction machine",
    "type": "mono"
  },
  {
    "id": "ex144",
    "group": "Fessiers",
    "name": "Kickback poulie",
    "type": "mono"
  },
  {
    "id": "ex145",
    "group": "Fessiers",
    "name": "Frog pump",
    "type": "mono"
  },
  {
    "id": "ex146",
    "group": "Fessiers",
    "name": "Step-up haut",
    "type": "mono"
  },
  {
    "id": "ex147",
    "group": "Fessiers",
    "name": "Cable pull-through",
    "type": "mono"
  },
  {
    "id": "ex148",
    "group": "Fessiers",
    "name": "Monster walk",
    "type": "mono"
  },
  {
    "id": "ex149",
    "group": "Fessiers",
    "name": "Banded side walk",
    "type": "mono"
  },
  {
    "id": "ex150",
    "group": "Fessiers",
    "name": "Hip airplane",
    "type": "mono"
  },
  {
    "id": "ex151",
    "group": "Fessiers",
    "name": "Donkey kick",
    "type": "mono"
  },
  {
    "id": "ex152",
    "group": "Fessiers",
    "name": "Reverse hyper",
    "type": "mono"
  },
  {
    "id": "ex153",
    "group": "Mollets",
    "name": "Mollets debout",
    "type": "mono"
  },
  {
    "id": "ex154",
    "group": "Mollets",
    "name": "Mollets assis",
    "type": "mono"
  },
  {
    "id": "ex155",
    "group": "Mollets",
    "name": "Mollets presse",
    "type": "mono"
  },
  {
    "id": "ex156",
    "group": "Mollets",
    "name": "Mollets unilatéral",
    "type": "mono"
  },
  {
    "id": "ex157",
    "group": "Mollets",
    "name": "Donkey calf raise",
    "type": "mono"
  },
  {
    "id": "ex158",
    "group": "Mollets",
    "name": "Tibialis raise",
    "type": "mono"
  },
  {
    "id": "ex159",
    "group": "Mollets",
    "name": "Sauts corde",
    "type": "mono"
  },
  {
    "id": "ex160",
    "group": "Mollets",
    "name": "Pogo jumps",
    "type": "mono"
  },
  {
    "id": "ex161",
    "group": "Mollets",
    "name": "Marche sur pointes",
    "type": "mono"
  },
  {
    "id": "ex162",
    "group": "Abdos",
    "name": "Crunch",
    "type": "mono"
  },
  {
    "id": "ex163",
    "group": "Abdos",
    "name": "Crunch câble",
    "type": "mono"
  },
  {
    "id": "ex164",
    "group": "Abdos",
    "name": "Gainage",
    "type": "mono"
  },
  {
    "id": "ex165",
    "group": "Abdos",
    "name": "Gainage latéral",
    "type": "mono"
  },
  {
    "id": "ex166",
    "group": "Abdos",
    "name": "Relevés de jambes",
    "type": "mono"
  },
  {
    "id": "ex167",
    "group": "Abdos",
    "name": "Toes to bar",
    "type": "mono"
  },
  {
    "id": "ex168",
    "group": "Abdos",
    "name": "Hollow hold",
    "type": "mono"
  },
  {
    "id": "ex169",
    "group": "Abdos",
    "name": "Hollow rock",
    "type": "mono"
  },
  {
    "id": "ex170",
    "group": "Abdos",
    "name": "Russian twist",
    "type": "mono"
  },
  {
    "id": "ex171",
    "group": "Abdos",
    "name": "Ab wheel",
    "type": "mono"
  },
  {
    "id": "ex172",
    "group": "Abdos",
    "name": "Dead bug",
    "type": "mono"
  },
  {
    "id": "ex173",
    "group": "Abdos",
    "name": "Mountain climber",
    "type": "mono"
  },
  {
    "id": "ex174",
    "group": "Abdos",
    "name": "Sit-up",
    "type": "mono"
  },
  {
    "id": "ex175",
    "group": "Abdos",
    "name": "V-up",
    "type": "mono"
  },
  {
    "id": "ex176",
    "group": "Abdos",
    "name": "Dragon flag",
    "type": "mono"
  },
  {
    "id": "ex177",
    "group": "Abdos",
    "name": "Pallof press",
    "type": "mono"
  },
  {
    "id": "ex178",
    "group": "Abdos",
    "name": "Woodchopper",
    "type": "mono"
  },
  {
    "id": "ex179",
    "group": "Abdos",
    "name": "Farmer carry gainage",
    "type": "mono"
  },
  {
    "id": "ex180",
    "group": "Avant-bras / Grip",
    "name": "Wrist curl",
    "type": "mono"
  },
  {
    "id": "ex181",
    "group": "Avant-bras / Grip",
    "name": "Reverse wrist curl",
    "type": "mono"
  },
  {
    "id": "ex182",
    "group": "Avant-bras / Grip",
    "name": "Farmer hold",
    "type": "mono"
  },
  {
    "id": "ex183",
    "group": "Avant-bras / Grip",
    "name": "Plate pinch",
    "type": "mono"
  },
  {
    "id": "ex184",
    "group": "Avant-bras / Grip",
    "name": "Dead hang",
    "type": "mono"
  },
  {
    "id": "ex185",
    "group": "Avant-bras / Grip",
    "name": "Towel pull-up",
    "type": "mono"
  },
  {
    "id": "ex186",
    "group": "Avant-bras / Grip",
    "name": "Fat grip curl",
    "type": "mono"
  },
  {
    "id": "ex187",
    "group": "Avant-bras / Grip",
    "name": "Pronation haltère",
    "type": "mono"
  },
  {
    "id": "ex188",
    "group": "Avant-bras / Grip",
    "name": "Supination haltère",
    "type": "mono"
  },
  {
    "id": "ex189",
    "group": "Avant-bras / Grip",
    "name": "Grip trainer",
    "type": "mono"
  },
  {
    "id": "ex190",
    "group": "Haltérophilie",
    "name": "Snatch balance",
    "type": "mono"
  },
  {
    "id": "ex191",
    "group": "Haltérophilie",
    "name": "Power snatch",
    "type": "mono"
  },
  {
    "id": "ex192",
    "group": "Haltérophilie",
    "name": "Hang snatch",
    "type": "mono"
  },
  {
    "id": "ex193",
    "group": "Haltérophilie",
    "name": "Muscle snatch",
    "type": "mono"
  },
  {
    "id": "ex194",
    "group": "Haltérophilie",
    "name": "Snatch pull",
    "type": "mono"
  },
  {
    "id": "ex195",
    "group": "Haltérophilie",
    "name": "Clean pull",
    "type": "mono"
  },
  {
    "id": "ex196",
    "group": "Haltérophilie",
    "name": "Power clean",
    "type": "mono"
  },
  {
    "id": "ex197",
    "group": "Haltérophilie",
    "name": "Hang clean",
    "type": "mono"
  },
  {
    "id": "ex198",
    "group": "Haltérophilie",
    "name": "Tall clean",
    "type": "mono"
  },
  {
    "id": "ex199",
    "group": "Haltérophilie",
    "name": "Jerk dip",
    "type": "mono"
  },
  {
    "id": "ex200",
    "group": "Haltérophilie",
    "name": "Split jerk",
    "type": "mono"
  },
  {
    "id": "ex201",
    "group": "Haltérophilie",
    "name": "Power jerk",
    "type": "mono"
  },
  {
    "id": "ex202",
    "group": "Haltérophilie",
    "name": "Clean deadlift",
    "type": "mono"
  },
  {
    "id": "ex203",
    "group": "Haltérophilie",
    "name": "Snatch deadlift",
    "type": "mono"
  },
  {
    "id": "ex204",
    "group": "Haltérophilie",
    "name": "Overhead squat",
    "type": "mono"
  },
  {
    "id": "ex205",
    "group": "Haltérophilie",
    "name": "Front squat pause",
    "type": "mono"
  },
  {
    "id": "ex206",
    "group": "CrossFit / Fonctionnel",
    "name": "AMRAP burpees",
    "type": "mono"
  },
  {
    "id": "ex207",
    "group": "CrossFit / Fonctionnel",
    "name": "Box jump over",
    "type": "mono"
  },
  {
    "id": "ex208",
    "group": "CrossFit / Fonctionnel",
    "name": "Dumbbell snatch",
    "type": "mono"
  },
  {
    "id": "ex209",
    "group": "CrossFit / Fonctionnel",
    "name": "Devil press",
    "type": "mono"
  },
  {
    "id": "ex210",
    "group": "CrossFit / Fonctionnel",
    "name": "Wall walk",
    "type": "mono"
  },
  {
    "id": "ex211",
    "group": "CrossFit / Fonctionnel",
    "name": "Hand release push-up",
    "type": "mono"
  },
  {
    "id": "ex212",
    "group": "CrossFit / Fonctionnel",
    "name": "Double unders",
    "type": "mono"
  },
  {
    "id": "ex213",
    "group": "CrossFit / Fonctionnel",
    "name": "Single unders",
    "type": "mono"
  },
  {
    "id": "ex214",
    "group": "CrossFit / Fonctionnel",
    "name": "Sandbag clean",
    "type": "mono"
  },
  {
    "id": "ex215",
    "group": "CrossFit / Fonctionnel",
    "name": "Sandbag carry",
    "type": "mono"
  },
  {
    "id": "ex216",
    "group": "CrossFit / Fonctionnel",
    "name": "Rope climb",
    "type": "mono"
  },
  {
    "id": "ex217",
    "group": "CrossFit / Fonctionnel",
    "name": "Bear crawl",
    "type": "mono"
  },
  {
    "id": "ex218",
    "group": "CrossFit / Fonctionnel",
    "name": "Sled push",
    "type": "mono"
  },
  {
    "id": "ex219",
    "group": "CrossFit / Fonctionnel",
    "name": "Sled pull",
    "type": "mono"
  },
  {
    "id": "ex220",
    "group": "CrossFit / Fonctionnel",
    "name": "Battle rope",
    "type": "mono"
  },
  {
    "id": "ex221",
    "group": "CrossFit / Fonctionnel",
    "name": "Man maker",
    "type": "mono"
  },
  {
    "id": "ex222",
    "group": "CrossFit / Fonctionnel",
    "name": "Renegade row",
    "type": "mono"
  },
  {
    "id": "ex223",
    "group": "Cardio / Endurance",
    "name": "Course facile",
    "type": "mono"
  },
  {
    "id": "ex224",
    "group": "Cardio / Endurance",
    "name": "Course tempo",
    "type": "mono"
  },
  {
    "id": "ex225",
    "group": "Cardio / Endurance",
    "name": "Sprint 10 m",
    "type": "mono"
  },
  {
    "id": "ex226",
    "group": "Cardio / Endurance",
    "name": "Sprint 30 m",
    "type": "mono"
  },
  {
    "id": "ex227",
    "group": "Cardio / Endurance",
    "name": "Sprint 100 m",
    "type": "mono"
  },
  {
    "id": "ex228",
    "group": "Cardio / Endurance",
    "name": "Rameur 500 m",
    "type": "mono"
  },
  {
    "id": "ex229",
    "group": "Cardio / Endurance",
    "name": "Rameur 2 km",
    "type": "mono"
  },
  {
    "id": "ex230",
    "group": "Cardio / Endurance",
    "name": "Assault bike calories",
    "type": "mono"
  },
  {
    "id": "ex231",
    "group": "Cardio / Endurance",
    "name": "SkiErg calories",
    "type": "mono"
  },
  {
    "id": "ex232",
    "group": "Cardio / Endurance",
    "name": "Vélo endurance",
    "type": "mono"
  },
  {
    "id": "ex233",
    "group": "Cardio / Endurance",
    "name": "Vélo fractionné",
    "type": "mono"
  },
  {
    "id": "ex234",
    "group": "Cardio / Endurance",
    "name": "Marche inclinée",
    "type": "mono"
  },
  {
    "id": "ex235",
    "group": "Cardio / Endurance",
    "name": "Escaliers",
    "type": "mono"
  },
  {
    "id": "ex236",
    "group": "Cardio / Endurance",
    "name": "Natation crawl",
    "type": "mono"
  },
  {
    "id": "ex237",
    "group": "Cardio / Endurance",
    "name": "Corde à sauter",
    "type": "mono"
  },
  {
    "id": "ex238",
    "group": "Mobilité / Prévention",
    "name": "Mobilité chevilles",
    "type": "mono"
  },
  {
    "id": "ex239",
    "group": "Mobilité / Prévention",
    "name": "Mobilité hanches",
    "type": "mono"
  },
  {
    "id": "ex240",
    "group": "Mobilité / Prévention",
    "name": "Mobilité épaules",
    "type": "mono"
  },
  {
    "id": "ex241",
    "group": "Mobilité / Prévention",
    "name": "Étirement psoas",
    "type": "mono"
  },
  {
    "id": "ex242",
    "group": "Mobilité / Prévention",
    "name": "Étirement ischios",
    "type": "mono"
  },
  {
    "id": "ex243",
    "group": "Mobilité / Prévention",
    "name": "Étirement pectoraux",
    "type": "mono"
  },
  {
    "id": "ex244",
    "group": "Mobilité / Prévention",
    "name": "Activation scapulaire",
    "type": "mono"
  },
  {
    "id": "ex245",
    "group": "Mobilité / Prévention",
    "name": "Activation fessiers",
    "type": "mono"
  },
  {
    "id": "ex246",
    "group": "Mobilité / Prévention",
    "name": "Rotateurs externes",
    "type": "mono"
  },
  {
    "id": "ex247",
    "group": "Mobilité / Prévention",
    "name": "Wall slides",
    "type": "mono"
  },
  {
    "id": "ex248",
    "group": "Mobilité / Prévention",
    "name": "Deep squat hold",
    "type": "mono"
  },
  {
    "id": "ex249",
    "group": "Mobilité / Prévention",
    "name": "Couch stretch",
    "type": "mono"
  },
  {
    "id": "ex250",
    "group": "Mobilité / Prévention",
    "name": "Banded ankle rocks",
    "type": "mono"
  },
  {
    "id": "ex251",
    "group": "Pectoraux",
    "name": "Développé couché barre tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex252",
    "group": "Pectoraux",
    "name": "Développé couché barre unilatéral",
    "type": "mono"
  },
  {
    "id": "ex253",
    "group": "Pectoraux",
    "name": "Développé couché haltères tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex254",
    "group": "Pectoraux",
    "name": "Développé couché haltères unilatéral",
    "type": "mono"
  },
  {
    "id": "ex255",
    "group": "Pectoraux",
    "name": "Développé incliné barre tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex256",
    "group": "Pectoraux",
    "name": "Développé incliné barre unilatéral",
    "type": "mono"
  },
  {
    "id": "ex257",
    "group": "Pectoraux",
    "name": "Développé incliné haltères tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex258",
    "group": "Pectoraux",
    "name": "Développé incliné haltères unilatéral",
    "type": "mono"
  },
  {
    "id": "ex259",
    "group": "Pectoraux",
    "name": "Développé décliné tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex260",
    "group": "Pectoraux",
    "name": "Développé décliné unilatéral",
    "type": "mono"
  },
  {
    "id": "ex261",
    "group": "Pectoraux",
    "name": "Écarté couché tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex262",
    "group": "Pectoraux",
    "name": "Écarté couché unilatéral",
    "type": "mono"
  },
  {
    "id": "ex263",
    "group": "Pectoraux",
    "name": "Écarté incliné tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex264",
    "group": "Pectoraux",
    "name": "Écarté incliné unilatéral",
    "type": "mono"
  },
  {
    "id": "ex265",
    "group": "Pectoraux",
    "name": "Écarté poulie haute tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex266",
    "group": "Pectoraux",
    "name": "Écarté poulie haute unilatéral",
    "type": "mono"
  },
  {
    "id": "ex267",
    "group": "Pectoraux",
    "name": "Écarté poulie basse tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex268",
    "group": "Pectoraux",
    "name": "Écarté poulie basse unilatéral",
    "type": "mono"
  },
  {
    "id": "ex269",
    "group": "Pectoraux",
    "name": "Pec deck tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex270",
    "group": "Pectoraux",
    "name": "Pec deck unilatéral",
    "type": "mono"
  },
  {
    "id": "ex271",
    "group": "Pectoraux",
    "name": "Pompes tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex272",
    "group": "Pectoraux",
    "name": "Pompes unilatéral",
    "type": "mono"
  },
  {
    "id": "ex273",
    "group": "Pectoraux",
    "name": "Pompes lestées tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex274",
    "group": "Pectoraux",
    "name": "Pompes lestées unilatéral",
    "type": "mono"
  },
  {
    "id": "ex275",
    "group": "Pectoraux",
    "name": "Pompes diamant tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex276",
    "group": "Pectoraux",
    "name": "Pompes diamant unilatéral",
    "type": "mono"
  },
  {
    "id": "ex277",
    "group": "Pectoraux",
    "name": "Dips pectoraux tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex278",
    "group": "Pectoraux",
    "name": "Dips pectoraux unilatéral",
    "type": "mono"
  },
  {
    "id": "ex279",
    "group": "Pectoraux",
    "name": "Pullover haltère tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex280",
    "group": "Pectoraux",
    "name": "Pullover haltère unilatéral",
    "type": "mono"
  },
  {
    "id": "ex281",
    "group": "Pectoraux",
    "name": "Chest press machine tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex282",
    "group": "Pectoraux",
    "name": "Chest press machine unilatéral",
    "type": "mono"
  },
  {
    "id": "ex283",
    "group": "Pectoraux",
    "name": "Svend press tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex284",
    "group": "Pectoraux",
    "name": "Svend press unilatéral",
    "type": "mono"
  },
  {
    "id": "ex285",
    "group": "Pectoraux",
    "name": "Landmine press unilatéral tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex286",
    "group": "Pectoraux",
    "name": "Landmine press unilatéral unilatéral",
    "type": "mono"
  },
  {
    "id": "ex287",
    "group": "Dos",
    "name": "Traction pronation tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex288",
    "group": "Dos",
    "name": "Traction pronation unilatéral",
    "type": "mono"
  },
  {
    "id": "ex289",
    "group": "Dos",
    "name": "Traction supination tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex290",
    "group": "Dos",
    "name": "Traction supination unilatéral",
    "type": "mono"
  },
  {
    "id": "ex291",
    "group": "Dos",
    "name": "Traction neutre tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex292",
    "group": "Dos",
    "name": "Traction neutre unilatéral",
    "type": "mono"
  },
  {
    "id": "ex293",
    "group": "Dos",
    "name": "Tirage vertical tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex294",
    "group": "Dos",
    "name": "Tirage vertical unilatéral",
    "type": "mono"
  },
  {
    "id": "ex295",
    "group": "Dos",
    "name": "Tirage poitrine tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex296",
    "group": "Dos",
    "name": "Tirage poitrine unilatéral",
    "type": "mono"
  },
  {
    "id": "ex297",
    "group": "Dos",
    "name": "Tirage nuque tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex298",
    "group": "Dos",
    "name": "Tirage nuque unilatéral",
    "type": "mono"
  },
  {
    "id": "ex299",
    "group": "Dos",
    "name": "Rowing barre tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex300",
    "group": "Dos",
    "name": "Rowing barre unilatéral",
    "type": "mono"
  },
  {
    "id": "ex301",
    "group": "Dos",
    "name": "Rowing haltère tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex302",
    "group": "Dos",
    "name": "Rowing haltère unilatéral",
    "type": "mono"
  },
  {
    "id": "ex303",
    "group": "Dos",
    "name": "Rowing T-bar tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex304",
    "group": "Dos",
    "name": "Rowing T-bar unilatéral",
    "type": "mono"
  },
  {
    "id": "ex305",
    "group": "Dos",
    "name": "Rowing poulie basse tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex306",
    "group": "Dos",
    "name": "Rowing poulie basse unilatéral",
    "type": "mono"
  },
  {
    "id": "ex307",
    "group": "Dos",
    "name": "Rowing machine tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex308",
    "group": "Dos",
    "name": "Rowing machine unilatéral",
    "type": "mono"
  },
  {
    "id": "ex309",
    "group": "Dos",
    "name": "Pull-over poulie tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex310",
    "group": "Dos",
    "name": "Pull-over poulie unilatéral",
    "type": "mono"
  },
  {
    "id": "ex311",
    "group": "Dos",
    "name": "Dead row tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex312",
    "group": "Dos",
    "name": "Dead row unilatéral",
    "type": "mono"
  },
  {
    "id": "ex313",
    "group": "Dos",
    "name": "Seal row tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex314",
    "group": "Dos",
    "name": "Seal row unilatéral",
    "type": "mono"
  },
  {
    "id": "ex315",
    "group": "Dos",
    "name": "Shrugs barre tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex316",
    "group": "Dos",
    "name": "Shrugs barre unilatéral",
    "type": "mono"
  },
  {
    "id": "ex317",
    "group": "Dos",
    "name": "Shrugs haltères tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex318",
    "group": "Dos",
    "name": "Shrugs haltères unilatéral",
    "type": "mono"
  },
  {
    "id": "ex319",
    "group": "Dos",
    "name": "Extension lombaire tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex320",
    "group": "Dos",
    "name": "Extension lombaire unilatéral",
    "type": "mono"
  },
  {
    "id": "ex321",
    "group": "Dos",
    "name": "Good morning tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex322",
    "group": "Dos",
    "name": "Good morning unilatéral",
    "type": "mono"
  },
  {
    "id": "ex323",
    "group": "Dos",
    "name": "Rack pull tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex324",
    "group": "Dos",
    "name": "Rack pull unilatéral",
    "type": "mono"
  },
  {
    "id": "ex325",
    "group": "Dos",
    "name": "Face pull dos tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex326",
    "group": "Dos",
    "name": "Face pull dos unilatéral",
    "type": "mono"
  },
  {
    "id": "ex327",
    "group": "Épaules",
    "name": "Développé militaire tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex328",
    "group": "Épaules",
    "name": "Développé militaire unilatéral",
    "type": "mono"
  },
  {
    "id": "ex329",
    "group": "Épaules",
    "name": "Développé haltères tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex330",
    "group": "Épaules",
    "name": "Développé haltères unilatéral",
    "type": "mono"
  },
  {
    "id": "ex331",
    "group": "Épaules",
    "name": "Développé Arnold tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex332",
    "group": "Épaules",
    "name": "Développé Arnold unilatéral",
    "type": "mono"
  },
  {
    "id": "ex333",
    "group": "Épaules",
    "name": "Push press tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex334",
    "group": "Épaules",
    "name": "Push press unilatéral",
    "type": "mono"
  },
  {
    "id": "ex335",
    "group": "Épaules",
    "name": "Élévations latérales tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex336",
    "group": "Épaules",
    "name": "Élévations latérales unilatéral",
    "type": "mono"
  },
  {
    "id": "ex337",
    "group": "Épaules",
    "name": "Élévations frontales tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex338",
    "group": "Épaules",
    "name": "Élévations frontales unilatéral",
    "type": "mono"
  },
  {
    "id": "ex339",
    "group": "Épaules",
    "name": "Oiseau haltères tempo contrôlé",
    "type": "mono"
  },
  {
    "id": "ex340",
    "group": "Épaules",
    "name": "Oiseau haltères unilatéral",
    "type": "mono"
  }
];
const STORAGE_KEY='BRAC_V12_DATA';
const uid=()=>`${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
const n=(v,f=0)=>{const x=Number(String(v??'').replace(',','.'));return Number.isFinite(x)?x:f};
const mmss=(s)=>`${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`;
const tempoSec=e=>n(e.tempoUp)+n(e.tempoTop)+n(e.tempoDown)+n(e.tempoBottom);
const emptyExercise=()=>({id:uid(),name:'',group:'',sets:'4',reps:'10',weight:'60',tempoUp:'1',tempoTop:'0',tempoDown:'3',tempoBottom:'1',restSet:'90',restExercise:'120'});
function estimateSession(exs){const clean=exs.filter(e=>e.name);const tonnage=clean.reduce((a,e)=>a+n(e.sets)*n(e.reps)*n(e.weight),0);const workSec=clean.reduce((a,e)=>a+n(e.sets)*n(e.reps)*Math.max(1,tempoSec(e))+(Math.max(0,n(e.sets)-1)*n(e.restSet))+n(e.restExercise),0);const minutes=Math.max(clean.length?5:0,Math.round(workSec/60));const calories=Math.round(minutes*7+tonnage*0.006);return{tonnage:Math.round(tonnage),minutes,calories};}
function Logo({small=false}){return <View style={[styles.logoWrap,small&&styles.logoSmall]}><MaterialCommunityIcons name="dumbbell" size={small?24:42} color={COLORS.text}/></View>}
function Header({title,back,onBack}){return <View style={styles.header}>{back?<Pressable onPress={onBack} style={styles.iconBtn}><Ionicons name="chevron-back" size={24} color={COLORS.text}/></Pressable>:<Logo small/>}<Text style={styles.headerTitle}>{title}</Text><View style={{width:44}}/></View>}
function Button({children,onPress,variant='primary',style}){return <Pressable onPress={onPress} style={({pressed})=>[styles.btn,variant==='ghost'&&styles.btnGhost,variant==='danger'&&styles.btnDanger,variant==='green'&&styles.btnGreen,pressed&&{opacity:.75},style]}><Text style={styles.btnText}>{children}</Text></Pressable>}
function Field({label,value,onChangeText,keyboardType='numeric'}){return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={String(value)} onChangeText={onChangeText} keyboardType={keyboardType} style={styles.input} placeholderTextColor={COLORS.muted}/></View>}

export default function App(){const [screen,setScreen]=useState('splash');const [sessions,setSessions]=useState([]);const [history,setHistory]=useState([]);const [selectedSession,setSelectedSession]=useState(null);const [summary,setSummary]=useState(null);const [loaded,setLoaded]=useState(false);
useEffect(()=>{(async()=>{try{const raw=await AsyncStorage.getItem(STORAGE_KEY); if(raw){const d=JSON.parse(raw);setSessions(d.sessions||[]);setHistory(d.history||[])}}catch(e){} setLoaded(true); setTimeout(()=>setScreen('home'),2200)})()},[]);
useEffect(()=>{if(loaded)AsyncStorage.setItem(STORAGE_KEY,JSON.stringify({sessions,history})).catch(()=>{})},[sessions,history,loaded]);
const nav={screen,setScreen,sessions,setSessions,history,setHistory,selectedSession,setSelectedSession,summary,setSummary};
return <SafeAreaView style={styles.safe}><StatusBar style="light"/>{screen==='splash'&&<Splash/>}{screen==='home'&&<Home nav={nav}/>} {screen==='create'&&<CreateSession nav={nav}/>} {screen==='start'&&<StartSession nav={nav}/>} {screen==='workout'&&<Workout nav={nav}/>} {screen==='summary'&&<Summary nav={nav}/>} {screen==='progress'&&<ProgressChoice nav={nav}/>} {screen==='stats'&&<Stats nav={nav}/>}</SafeAreaView>}

function Splash(){const pulse=useRef(new Animated.Value(0)).current;const bar=useRef(new Animated.Value(0)).current;useEffect(()=>{Animated.loop(Animated.sequence([Animated.timing(pulse,{toValue:1,duration:850,useNativeDriver:true,easing:Easing.out(Easing.quad)}),Animated.timing(pulse,{toValue:0,duration:850,useNativeDriver:true,easing:Easing.in(Easing.quad)})])).start();Animated.timing(bar,{toValue:1,duration:1900,useNativeDriver:false,easing:Easing.out(Easing.cubic)}).start();},[]);return <View style={styles.splash}><Animated.View style={{transform:[{scale:pulse.interpolate({inputRange:[0,1],outputRange:[1,.94]})}],opacity:pulse.interpolate({inputRange:[0,1],outputRange:[1,.8]})}}><Logo/><Text style={styles.brand}>BRAC</Text><Text style={styles.tagline}>BUILD • PERFORM • PROGRESS</Text></Animated.View><View style={styles.loadingTrack}><Animated.View style={[styles.loadingBar,{width:bar.interpolate({inputRange:[0,1],outputRange:['5%','100%']})}]}/></View><Text style={styles.version}>V1.2.0</Text></View>}
function Home({nav}){const totalT=nav.history.reduce((a,h)=>a+(h.real?.tonnage||0),0);const totalC=nav.history.reduce((a,h)=>a+(h.real?.calories||0),0);return <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:36}}><View style={styles.hero}><Logo/><Text style={styles.brand}>BRAC</Text><Text style={styles.tagline}>TRAIN. FUEL. PERFORM.</Text><Text style={styles.heroText}>Accueil performance. Crée, démarre et mesure tes séances.</Text></View><View style={styles.row}><Stat icon="🏋️" value={`${nav.sessions.length}/10`} label="Séances"/><Stat icon="🔥" value={totalC} label="Calories"/><Stat icon="💪" value={`${totalT} kg`} label="Tonnage"/></View><View style={styles.menuGrid}><Menu icon="add-circle" color={COLORS.violet2} title="Créer" text="Construire une séance" onPress={()=>nav.setScreen('create')}/><Menu icon="play-circle" color={COLORS.green} title="Démarrer" text="Lancer une séance" onPress={()=>nav.setScreen('start')}/><Menu icon="stats-chart" color={COLORS.blue} title="Stats" text="Voir ta progression" onPress={()=>nav.setScreen('stats')}/></View><Text style={styles.sectionTitle}>Séances enregistrées</Text>{nav.sessions.length===0?<Text style={styles.empty}>Aucune séance. Clique sur Créer.</Text>:nav.sessions.map(s=><SessionCard key={s.id} session={s} onStart={()=>{nav.setSelectedSession(s);nav.setScreen('start')}} onDelete={()=>nav.setSessions(nav.sessions.filter(x=>x.id!==s.id))}/>)}</ScrollView>}
function Stat({icon,value,label}){return <View style={styles.statCard}><Text style={styles.statIcon}>{icon}</Text><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>}
function Menu({icon,color,title,text,onPress}){return <Pressable onPress={onPress} style={styles.menuCard}><Ionicons name={icon} size={34} color={color}/><Text style={styles.menuTitle}>{title}</Text><Text style={styles.muted}>{text}</Text></Pressable>}
function SessionCard({session,onStart,onDelete}){const est=estimateSession(session.exercises);return <View style={styles.sessionCard}><View style={{flex:1}}><Text style={styles.sessionTitle}>{session.name}</Text><Text style={styles.muted}>{session.exercises.length} exercices • {est.minutes} min • {est.tonnage} kg • {est.calories} kcal</Text></View><Pressable onPress={onStart} style={styles.smallBtn}><Ionicons name="play" size={18} color="white"/></Pressable><Pressable onPress={onDelete} style={[styles.smallBtn,{backgroundColor:COLORS.red}]}><Ionicons name="trash" size={18} color="white"/></Pressable></View>}
function CreateSession({nav}){const [name,setName]=useState(`Séance ${nav.sessions.length+1}`);const [exercises,setExercises]=useState([emptyExercise()]);const est=useMemo(()=>estimateSession(exercises),[exercises]);const [toast,setToast]=useState('');const update=(id,patch)=>setExercises(exercises.map(e=>e.id===id?{...e,...patch}:e));const save=()=>{const clean=exercises.filter(e=>e.name);if(nav.sessions.length>=10){setToast('Limite : 10 séances. Supprime une séance pour en créer une nouvelle.');return}if(!name.trim()||!clean.length){setToast('Ajoute un nom et au moins un exercice.');return}nav.setSessions([...nav.sessions,{id:uid(),name:name.trim(),exercises:clean}]);nav.setScreen('home')};return <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}><ScrollView style={styles.container} contentContainerStyle={{paddingBottom:40}}><Header title="Créer une séance" back onBack={()=>nav.setScreen('home')}/><Text style={styles.label}>Nom de la séance</Text><TextInput value={name} onChangeText={setName} style={styles.input} placeholderTextColor={COLORS.muted}/>{toast?<Text style={styles.toast}>{toast}</Text>:null}<View style={styles.estimateBox}><Text style={styles.estimateTitle}>Estimation automatique</Text><Text style={styles.estimateText}>🔥 {est.calories} kcal   🏋️ {est.tonnage} kg   ⏱ {est.minutes} min</Text></View>{exercises.map((ex,i)=><ExerciseEditor key={ex.id} ex={ex} index={i} update={update} remove={()=>setExercises(exercises.filter(e=>e.id!==ex.id))}/>) }<Button variant="ghost" onPress={()=>setExercises([...exercises,emptyExercise()])}>+ Ajouter un exercice</Button><Button onPress={save}>Enregistrer la séance</Button></ScrollView></KeyboardAvoidingView>}
function ExerciseEditor({ex,index,update,remove}){const [picker,setPicker]=useState(false);return <View style={styles.editCard}><View style={styles.editHeader}><Text style={styles.cardTitle}>{index+1}. {ex.name||'Choisir un exercice'}</Text><Pressable onPress={remove}><Ionicons name="close" size={22} color={COLORS.red}/></Pressable></View><Button variant="ghost" onPress={()=>setPicker(true)}>{ex.name?'Changer exercice':'Sélectionner exercice'}</Button><View style={styles.formGrid}><Field label="Séries" value={ex.sets} onChangeText={v=>update(ex.id,{sets:v})}/><Field label="Répétitions" value={ex.reps} onChangeText={v=>update(ex.id,{reps:v})}/><Field label="Poids estimé kg" value={ex.weight} onChangeText={v=>update(ex.id,{weight:v})}/></View><Text style={styles.subTitle}>Tempo d'exécution</Text><View style={styles.tempoGrid}><Field label="Montée" value={ex.tempoUp} onChangeText={v=>update(ex.id,{tempoUp:v})}/><Field label="Arrêt haut" value={ex.tempoTop} onChangeText={v=>update(ex.id,{tempoTop:v})}/><Field label="Descente" value={ex.tempoDown} onChangeText={v=>update(ex.id,{tempoDown:v})}/><Field label="Arrêt bas" value={ex.tempoBottom} onChangeText={v=>update(ex.id,{tempoBottom:v})}/></View><View style={styles.formGrid}><Field label="Repos séries sec" value={ex.restSet} onChangeText={v=>update(ex.id,{restSet:v})}/><Field label="Repos exercices sec" value={ex.restExercise} onChangeText={v=>update(ex.id,{restExercise:v})}/></View><ExercisePicker visible={picker} onClose={()=>setPicker(false)} onPick={pick=>{update(ex.id,{name:pick.name,group:pick.group});setPicker(false)}}/></View>}
function ExercisePicker({visible,onClose,onPick}){const groups=['Polyarticulaire','Pectoraux','Dos','Épaules','Biceps','Triceps','Quadriceps','Ischios','Fessiers','Mollets','Abdos','Avant-bras / Grip','Haltérophilie','CrossFit / Fonctionnel','Cardio / Endurance','Mobilité / Prévention'];const [group,setGroup]=useState('Polyarticulaire');const [query,setQuery]=useState('');const list=useMemo(()=>EXERCISES.filter(e=>e.group===group&&e.name.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>group==='Polyarticulaire'?a.name.localeCompare(b.name):0),[group,query]);return <Modal visible={visible} animationType="slide"><SafeAreaView style={styles.safe}><View style={styles.container}><Header title="Bibliothèque exercices" back onBack={onClose}/><TextInput value={query} onChangeText={setQuery} style={styles.input} placeholder="Rechercher un exercice" placeholderTextColor={COLORS.muted}/><ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical:12}}>{groups.map(g=><Pressable key={g} onPress={()=>setGroup(g)} style={[styles.chip,group===g&&styles.chipActive]}><Text style={[styles.chipText,group===g&&{color:'#fff'}]}>{g}</Text></Pressable>)}</ScrollView><Text style={styles.muted}>{list.length} exercices affichés • bibliothèque 300+</Text><FlatList data={list} keyExtractor={i=>i.id} renderItem={({item})=><Pressable onPress={()=>onPick(item)} style={styles.exerciseRow}><Text style={styles.exerciseName}>{item.name}</Text><Text style={styles.exerciseGroup}>{item.group}</Text></Pressable>}/></View></SafeAreaView></Modal>}
function StartSession({nav}){const [warmModal,setWarmModal]=useState(null);return <ScrollView style={styles.container}><Header title="Démarrer" back onBack={()=>nav.setScreen('home')}/><Text style={styles.sectionTitle}>Choisis une séance</Text>{nav.sessions.length===0?<Text style={styles.empty}>Aucune séance enregistrée.</Text>:nav.sessions.map(s=><SessionCard key={s.id} session={s} onStart={()=>{nav.setSelectedSession(s);setWarmModal(s)}} onDelete={()=>nav.setSessions(nav.sessions.filter(x=>x.id!==s.id))}/>) }<WarmupChoice visible={!!warmModal} onNo={()=>{setWarmModal(null);nav.setScreen('workout')}} onYes={()=>{setWarmModal(null);nav.setSelectedSession({...warmModal,warmup:true});nav.setScreen('workout')}} onClose={()=>setWarmModal(null)}/></ScrollView>}
function WarmupChoice({visible,onYes,onNo,onClose}){return <Modal visible={visible} transparent animationType="fade"><View style={styles.overlay}><View style={styles.bracModal}><Logo small/><Text style={styles.modalTitle}>Échauffement</Text><Text style={styles.mutedCenter}>Souhaites-tu t’échauffer avant la séance ?</Text><View style={styles.row}><Button variant="ghost" style={{flex:1}} onPress={onNo}>NON</Button><Button style={{flex:1}} onPress={onYes}>OUI</Button></View><Pressable onPress={onClose}><Text style={styles.modalCancel}>Annuler</Text></Pressable></View></View></Modal>}
function Workout({nav}){const session=nav.selectedSession;if(!session)return <View style={styles.container}><Header title="Séance" back onBack={()=>nav.setScreen('home')}/><Text style={styles.empty}>Aucune séance sélectionnée.</Text></View>;const [warmup,setWarmup]=useState(!!session.warmup);const [started,setStarted]=useState(!session.warmup);const [warmSec,setWarmSec]=useState(0);const [mainSec,setMainSec]=useState(0);const [exIdx,setExIdx]=useState(0);const [rows,setRows]=useState([]);const [done,setDone]=useState([]);const [restSec,setRestSec]=useState(0);const [restRunning,setRestRunning]=useState(false);const blink=useRef(new Animated.Value(0)).current;const current=session.exercises[exIdx];useEffect(()=>{setRows(Array.from({length:n(current?.sets,0)},()=>({reps:'',weight:''})));setRestSec(0);setRestRunning(false)},[exIdx]);useEffect(()=>{const t=setInterval(()=>{if(warmup&&!started)setWarmSec(s=>s+1);if(started)setMainSec(s=>s+1);if(restRunning)setRestSec(s=>s+1)},1000);return()=>clearInterval(t)},[warmup,started,restRunning]);useEffect(()=>{Animated.loop(Animated.sequence([Animated.timing(blink,{toValue:1,duration:450,useNativeDriver:false}),Animated.timing(blink,{toValue:0,duration:450,useNativeDriver:false})])).start()},[]);const updateRow=(i,p)=>setRows(rows.map((r,idx)=>idx===i?{...r,...p}:r));const completed=rows.every(r=>String(r.reps).trim()&&String(r.weight).trim());const finish=(force=false)=>{if(!completed&&!force)return;const newDone=[...done,{exercise:current,rows}];if(force||exIdx>=session.exercises.length-1){const estimated=estimateSession(session.exercises);const realTonnage=newDone.reduce((a,d)=>a+d.rows.reduce((b,r)=>b+n(r.reps)*n(r.weight),0),0);const real={tonnage:Math.round(realTonnage),minutes:Math.round(mainSec/60),calories:Math.round((mainSec/60)*7+realTonnage*.006)};const sum={sessionId:session.id,name:session.name,date:new Date().toISOString(),estimated,real};nav.setHistory([...nav.history,{id:uid(),...sum}]);nav.setSummary(sum);nav.setSelectedSession(session);nav.setScreen('summary')}else{setDone(newDone);setExIdx(exIdx+1)}};if(warmup&&!started)return <View style={styles.container}><Header title="Échauffement" back onBack={()=>nav.setScreen('home')}/><View style={styles.warmCard}><Logo/><Text style={styles.sectionTitle}>Préparation</Text><View style={styles.timerCircle}><Text style={styles.bigTimer}>{mmss(warmSec)}</Text><Text style={styles.muted}>Chrono échauffement</Text></View><Button onPress={()=>{setWarmup(false);setStarted(true)}}>Commencer la séance</Button><Button variant="ghost" onPress={()=>{setWarmup(false);setStarted(true)}}>Passer l'échauffement</Button></View></View>;const restLimit=n(current.restSet,90);const restColor=restSec>=restLimit?blink.interpolate({inputRange:[0,1],outputRange:[COLORS.card2,COLORS.red]}):COLORS.card2;return <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:40}}><Header title={session.name} back onBack={()=>nav.setScreen('home')}/><Text style={styles.mainTimer}>⏱ {mmss(mainSec)}</Text><View style={styles.editCard}><Text style={styles.cardTitle}>{exIdx+1}/{session.exercises.length} — {current.name}</Text><Text style={styles.muted}>Tempo {current.tempoUp}-{current.tempoTop}-{current.tempoDown}-{current.tempoBottom} • Repos cible {current.restSet}s</Text>{rows.map((r,i)=><View key={i} style={styles.setRow}><View style={{flex:1.1}}><Text style={styles.setText}>Série {i+1}</Text><Text style={styles.mutedSmall}>Prévu {current.reps} x {current.weight} kg</Text></View><TextInput style={styles.miniInput} placeholder="reps" placeholderTextColor={COLORS.muted} value={r.reps} onChangeText={v=>updateRow(i,{reps:v})}/><TextInput style={styles.miniInput} placeholder="kg" placeholderTextColor={COLORS.muted} value={r.weight} onChangeText={v=>updateRow(i,{weight:v})}/></View>)}<Pressable onPress={()=>{setRestRunning(true);setRestSec(0)}}><Animated.View style={[styles.restBox,{backgroundColor:restColor}]}><Text style={styles.restText}>REPOS • {mmss(restSec)} / {mmss(restLimit)}</Text></Animated.View></Pressable></View><View style={styles.row}><Button variant="danger" style={{flex:1}} onPress={()=>finish(true)}>Fini</Button><Button style={{flex:1}} onPress={()=>finish(false)}>{exIdx>=session.exercises.length-1?'Finir':'Suivant'}</Button></View>{!completed?<Text style={styles.toast}>Remplis les reps et poids réalisés pour passer au suivant.</Text>:null}</ScrollView>}
function Summary({nav}){const s=nav.summary;if(!s)return null;return <ScrollView style={styles.container}><Header title="Fin de séance" back onBack={()=>nav.setScreen('home')}/><View style={styles.summary}><Text style={styles.sectionTitle}>Résumé comparatif</Text><View style={styles.compare}><View style={styles.compareCol}><Text style={styles.muted}>Estimé</Text><Text style={styles.big}>{s.estimated.calories} kcal</Text><Text style={styles.big}>{s.estimated.tonnage} kg</Text><Text style={styles.big}>{s.estimated.minutes} min</Text></View><View style={styles.compareCol}><Text style={styles.muted}>Réalisé</Text><Text style={styles.bigGreen}>{s.real.calories} kcal</Text><Text style={styles.bigGreen}>{s.real.tonnage} kg</Text><Text style={styles.bigGreen}>{s.real.minutes} min</Text></View></View></View><Button onPress={()=>nav.setScreen('progress')}>Suivant</Button></ScrollView>}
function ProgressChoice({nav}){const apply=type=>{const s=nav.selectedSession;if(!s){nav.setScreen('home');return}nav.setSessions(nav.sessions.map(x=>x.id===s.id?{...x,exercises:x.exercises.map(e=>({...e,reps:type==='rep'?String(n(e.reps)+1):e.reps,weight:type==='kg'?String(n(e.weight)+1):e.weight}))}:x));nav.setSelectedSession(null);nav.setSummary(null);nav.setScreen('home')};return <View style={styles.container}><Header title="Progression" back onBack={()=>nav.setScreen('home')}/><View style={styles.hero}><Logo/><Text style={styles.sectionTitle}>Préparer la prochaine séance</Text><Text style={styles.mutedCenter}>Choisis une progression automatique.</Text><Button onPress={()=>apply('rep')}>+1 rep sur toutes les séries</Button><Button onPress={()=>apply('kg')}>+1 kilo sur toutes les séries</Button><Button variant="ghost" onPress={()=>nav.setScreen('home')}>Retour accueil sans modifier</Button></View></View>}
function Stats({nav}){const maxT=Math.max(1,...nav.history.map(h=>Math.max(h.estimated.tonnage,h.real.tonnage)));const maxC=Math.max(1,...nav.history.map(h=>Math.max(h.estimated.calories,h.real.calories)));return <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:40}}><Header title="Stats" back onBack={()=>nav.setScreen('home')}/><Text style={styles.sectionTitle}>Calories : théorique / réalisé</Text><Graph data={nav.history.map(h=>({a:h.estimated.calories,b:h.real.calories,label:h.name.slice(0,5)}))} max={maxC}/><Text style={styles.sectionTitle}>Tonnage : théorique / réalisé</Text><Graph data={nav.history.map(h=>({a:h.estimated.tonnage,b:h.real.tonnage,label:h.name.slice(0,5)}))} max={maxT}/>{nav.history.length===0&&<Text style={styles.empty}>Aucune séance réalisée pour l'instant.</Text>}</ScrollView>}
function Graph({data,max}){return <ScrollView horizontal style={styles.graph} contentContainerStyle={{alignItems:'flex-end',padding:12,paddingBottom:28}}>{data.slice(-12).map((d,i)=><View key={i} style={styles.barGroup}><View style={[styles.bar,{height:Math.max(8,d.a/max*130),backgroundColor:COLORS.violet2}]}/><View style={[styles.bar,{height:Math.max(8,d.b/max*130),backgroundColor:COLORS.green}]}/><Text style={styles.barLabel}>{d.label}</Text></View>)}</ScrollView>}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:COLORS.bg},container:{flex:1,backgroundColor:COLORS.bg,padding:16},splash:{flex:1,backgroundColor:COLORS.bg,alignItems:'center',justifyContent:'center'},loadingTrack:{height:6,width:'70%',backgroundColor:COLORS.card2,borderRadius:99,marginTop:42,overflow:'hidden'},loadingBar:{height:6,backgroundColor:COLORS.violet2,borderRadius:99},version:{color:COLORS.muted,marginTop:18},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:18},headerTitle:{color:COLORS.text,fontWeight:'900',fontSize:20},iconBtn:{width:44,height:44,alignItems:'center',justifyContent:'center'},logoWrap:{width:84,height:84,borderRadius:24,borderWidth:2,borderColor:COLORS.violet,alignItems:'center',justifyContent:'center',backgroundColor:'#0D0D16',shadowColor:COLORS.violet,shadowOpacity:.5,shadowRadius:18},logoSmall:{width:44,height:44,borderRadius:14,marginRight:-4},brand:{fontSize:44,fontWeight:'900',color:COLORS.text,letterSpacing:2,marginTop:12},tagline:{color:COLORS.muted,letterSpacing:3,fontWeight:'800'},hero:{alignItems:'center',padding:22,borderRadius:24,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.card,marginBottom:16},heroText:{color:COLORS.text,textAlign:'center',marginTop:16,fontSize:16},row:{flexDirection:'row',gap:10,marginVertical:10},statCard:{flex:1,padding:14,borderRadius:16,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.border,alignItems:'center'},statIcon:{fontSize:24},statValue:{color:COLORS.text,fontSize:18,fontWeight:'900',marginTop:4},statLabel:{color:COLORS.muted,fontSize:12},menuGrid:{gap:12},menuCard:{padding:18,borderRadius:18,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.border},menuTitle:{color:COLORS.text,fontSize:22,fontWeight:'900',marginTop:8},muted:{color:COLORS.muted},mutedCenter:{color:COLORS.muted,textAlign:'center'},mutedSmall:{color:COLORS.muted,fontSize:11},sectionTitle:{color:COLORS.text,fontSize:18,fontWeight:'900',marginTop:20,marginBottom:10},subTitle:{color:COLORS.text,fontSize:15,fontWeight:'900',marginTop:14,marginBottom:4},empty:{color:COLORS.muted,textAlign:'center',marginVertical:20},sessionCard:{flexDirection:'row',alignItems:'center',gap:8,padding:14,borderRadius:16,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.border,marginBottom:10},sessionTitle:{color:COLORS.text,fontWeight:'900',fontSize:16},smallBtn:{width:40,height:40,borderRadius:12,backgroundColor:COLORS.violet,alignItems:'center',justifyContent:'center'},btn:{backgroundColor:COLORS.violet,padding:15,borderRadius:14,alignItems:'center',marginTop:12},btnGhost:{backgroundColor:COLORS.card2,borderWidth:1,borderColor:COLORS.border},btnDanger:{backgroundColor:COLORS.red},btnGreen:{backgroundColor:COLORS.green},btnText:{color:'#fff',fontWeight:'900'},label:{color:COLORS.muted,fontSize:12,marginBottom:6,marginTop:8},input:{backgroundColor:COLORS.card2,borderWidth:1,borderColor:COLORS.border,borderRadius:12,color:COLORS.text,padding:12},field:{flex:1,minWidth:'47%'},formGrid:{flexDirection:'row',flexWrap:'wrap',gap:10},tempoGrid:{flexDirection:'row',flexWrap:'wrap',gap:8},estimateBox:{padding:14,borderRadius:16,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.violet,marginVertical:14},estimateTitle:{color:COLORS.text,fontWeight:'900'},estimateText:{color:COLORS.violet2,fontSize:16,fontWeight:'900',marginTop:6},editCard:{padding:14,borderRadius:18,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.border,marginBottom:12},editHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},cardTitle:{color:COLORS.text,fontSize:17,fontWeight:'900'},chip:{paddingHorizontal:14,paddingVertical:10,borderRadius:999,backgroundColor:COLORS.card2,marginRight:8,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center'},chipActive:{backgroundColor:COLORS.violet},chipText:{color:COLORS.muted,fontWeight:'800',fontSize:12},exerciseRow:{padding:15,borderBottomWidth:1,borderBottomColor:COLORS.border},exerciseName:{color:COLORS.text,fontWeight:'900',fontSize:16},exerciseGroup:{color:COLORS.muted,marginTop:4},overlay:{flex:1,backgroundColor:'rgba(0,0,0,.72)',alignItems:'center',justifyContent:'center',padding:22},bracModal:{width:'100%',padding:20,borderRadius:24,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.violet,alignItems:'center'},modalTitle:{color:COLORS.text,fontSize:22,fontWeight:'900',marginTop:12},modalCancel:{color:COLORS.muted,marginTop:14},warmCard:{padding:20,borderRadius:24,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.border,alignItems:'center'},timerCircle:{width:220,height:220,borderRadius:110,borderWidth:7,borderColor:COLORS.violet,alignSelf:'center',alignItems:'center',justifyContent:'center',marginVertical:28,backgroundColor:COLORS.card2},bigTimer:{color:COLORS.text,fontSize:46,fontWeight:'900'},mainTimer:{color:COLORS.violet2,fontSize:28,fontWeight:'900',textAlign:'center',marginBottom:10},setRow:{flexDirection:'row',alignItems:'center',gap:8,paddingVertical:8,borderBottomWidth:1,borderBottomColor:COLORS.border},setText:{color:COLORS.text,fontSize:13,fontWeight:'800'},miniInput:{width:68,padding:10,borderRadius:10,borderWidth:1,borderColor:COLORS.border,color:COLORS.text,backgroundColor:COLORS.card2},restBox:{padding:16,borderRadius:14,alignItems:'center',marginTop:14,borderWidth:1,borderColor:COLORS.border},restText:{color:COLORS.text,fontWeight:'900'},summary:{padding:14,borderRadius:18,backgroundColor:COLORS.card,borderWidth:1,borderColor:COLORS.border},compare:{flexDirection:'row',justifyContent:'space-around',gap:12},compareCol:{flex:1,backgroundColor:COLORS.card2,borderRadius:16,padding:14},big:{color:COLORS.text,fontSize:18,fontWeight:'900',marginTop:6},bigGreen:{color:COLORS.green,fontSize:18,fontWeight:'900',marginTop:6},graph:{backgroundColor:COLORS.card,borderRadius:18,borderWidth:1,borderColor:COLORS.border,minHeight:180},barGroup:{alignItems:'flex-end',marginRight:12,flexDirection:'row',gap:3},bar:{width:14,borderRadius:5},barLabel:{color:COLORS.muted,fontSize:10,position:'absolute',bottom:-18,left:0},toast:{color:COLORS.amber,marginTop:10,fontWeight:'800'}});
