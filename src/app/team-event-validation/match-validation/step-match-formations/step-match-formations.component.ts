import { Component, OnInit } from '@angular/core';

const players = [
  {id: 1, name: 'John A.'},
  {id: 2, name: 'John A.'},
  {id: 3, name: 'John A.'},
  {id: 4, name: 'John A.'},
  {id: 5, name: 'John A.'},
  {id: 6, name: 'John A.'},
  {id: 7, name: 'John A.'},
];

const formations = [
  {
      "_id": 1,
      "name": "4-4-2",
      "positions": [
          {
              "playerId": "5dfb821ad6c086800f74c67b",
              "posX": 4,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a3e3ffc96c96b88c6",
              "posX": 3,
              "posY": 2,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ab5ab05a3790eaf43",
              "posX": 5,
              "posY": 2,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ac97479524acf3787",
              "posX": 3,
              "posY": 4,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a1d9c688320f4589c",
              "posX": 5,
              "posY": 4,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a1ebb0b841945f392",
              "posX": 7,
              "posY": 4,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a04ec50bcf8f7116b",
              "posX": 1,
              "posY": 4,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a741fc5316501b315",
              "posX": 1,
              "posY": 6,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a3e5b314c6ab84b62",
              "posX": 3,
              "posY": 6,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a0802253bb03b04c0",
              "posX": 5,
              "posY": 6,
              "name": "DF"
          },
          {
              "playerId": "5dfb821aad83b3b83555422b",
              "posX": 7,
              "posY": 6,
              "name": "GK"
          }
      ]
  },
  {
      "_id": 2,
      "name": "4-3-3",
      "positions": [
          {
              "playerId": "5dfb821a085175ff288c0e5a",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a632e6a3541f7e8e3",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a8bcb46ba6ff16400",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821aa0501b1b99362f51",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a8dd858db4cdcd62f",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821acc1a58b5334e425c",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a99b2c6b87d8a338b",
              "posX": 5,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a7e43098e9bd47423",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821aa1abbb0695f4855d",
              "posX": 5,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a91c64059d1b46e3d",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a84f7ef6dfaf8d6e6",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          }
      ]
  },
  {
      "_id": 3,
      "name": "4-2-1-3",
      "positions": [
          {
              "playerId": "5dfb821af5426b58162d6e78",
              "posX": 5,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a592f041525073b78",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821aa187d99f835fb28d",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a97981200a6824e0a",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ae86095537e5dec0c",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ac106923f5ea245d1",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a76ff035bf66ce624",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ac669e9370e48b2cf",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a3a5f7666a5714c0c",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a438d93bc39f14c05",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a093a87f07ae4b609",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          }
      ]
  },
  {
      "_id": 4,
      "name": "4-1-2-3",
      "positions": [
          {
              "playerId": "5dfb821a6b341e94340bdff9",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a2a96b063ce51e7ef",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a43ff5cc4749a8da1",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821af98fbd9f08b3cf83",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ac6208b1f92386bfb",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a36dd78c83750115c",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a373a1a17f0f92c1b",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ac237fcbf646f6516",
              "posX": 5,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a90be093b21869f6a",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a549b7d3a13df98cc",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ac68009fe26f34b6e",
              "posX": 5,
              "posY": 7,
              "name": "DF"
          }
      ]
  },
  {
      "_id": 5,
      "name": "4-5-1",
      "positions": [
          {
              "playerId": "5dfb821af0cc17c8ca43bd93",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a11d8308f7a192c46",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821aaa585af4212baa5a",
              "posX": 5,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ad416f04b4f99ac95",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a4c38ab5bb609d52a",
              "posX": 5,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ab1d3b3de7eb0c67e",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821abe6fc814ac48f5d1",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821af051a9a6a960fad7",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821af697c3a8ea54115b",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ac078999ef09f1ba0",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ac1027ffb979936fe",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          }
      ]
  },
  {
      "_id": 6,
      "name": "3-4-3",
      "positions": [
          {
              "playerId": "5dfb821a9f533092ee4e88ed",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a7f20812cfd465b7a",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821af766bc7a13fe7819",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821acfbf86b5e7ca97e6",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a739a75f8bc966747",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a86b0b9d4ccfbc59e",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ab7428eaa927d8ac9",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a6d0d6b57d1bdfefe",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a63c3b9b55baf8582",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a701f508c7b660359",
              "posX": 5,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a403262a817d0a015",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          }
      ]
  },
  {
      "_id": 7,
      "name": "5-3-2",
      "positions": [
          {
              "playerId": "5dfb821a3311d5db3cc40d56",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a3c8f552674cb321e",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a057fb1caad324f69",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a71ca3a58d460eaa0",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821afd3cc6467f1e501a",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a997dc42a6dc4c817",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821aa5d2e9e2741cc30a",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a20ad5758219d212a",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a3785dfcb6e3bc310",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a6a69d342e47648ce",
              "posX": 5,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a9bdf8624c5204c56",
              "posX": 5,
              "posY": 7,
              "name": "GK"
          }
      ]
  },
  {
      "_id": 8,
      "name": "5-2-3",
      "positions": [
          {
              "playerId": "5dfb821aba2ca394d7df33b6",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ae3e096d5b3e91782",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a3560847be348eed8",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a76157fa3ff7a29b1",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a4c125f2e16f90b3d",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ae953c25e6a626b49",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ae0aaf3e88a7ddc10",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a38d42a22d5df4cc2",
              "posX": 1,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a520b99dfa33d10ea",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821aed841e782d43b4cd",
              "posX": 5,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821af8907bd8ac9b8ad7",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          }
      ]
  },
  {
      "_id": 9,
      "name": "5-4-1",
      "positions": [
          {
              "playerId": "5dfb821ad08b40728bf6ec84",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a910b771c701a8189",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821af4b13580e79f69df",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a96b08ee699e0a9cc",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a6c941e9b4ec02828",
              "posX": 5,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821aa0040efb29528fb8",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ad18b5115cf494eff",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821aa4d3bf0626a22a4e",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ad39b3f4f87ec6189",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821ae79abbd7e179c58f",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a79cefbfaa7689c4f",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          }
      ]
  },
  {
      "_id": 10,
      "name": "3-5-2",
      "positions": [
          {
              "playerId": "5dfb821ab4a863b14f4d5eef",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a1167d30e475c20df",
              "posX": 1,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a1a89636666472725",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          },
          {
              "playerId": "5dfb821af31981a888977847",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a3fd1ae9c3c67b549",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821ad6a93946f6bed6ad",
              "posX": 1,
              "posY": 7,
              "name": "GK"
          },
          {
              "playerId": "5dfb821a114a49a21702b8ab",
              "posX": 1,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a4f081a391753cd42",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821a752866c18271737b",
              "posX": 5,
              "posY": 1,
              "name": "DF"
          },
          {
              "playerId": "5dfb821acb18fb538cccb403",
              "posX": 5,
              "posY": 7,
              "name": "DF"
          },
          {
              "playerId": "5dfb821aae289692b440e2d0",
              "posX": 5,
              "posY": 1,
              "name": "GK"
          }
      ]
  }
];


@Component({
  selector: 'app-step-match-formations',
  templateUrl: './step-match-formations.component.html',
  styleUrls: ['./step-match-formations.component.scss']
})
export class StepMatchFormationsComponent implements OnInit {
  playersData = [
    {id: 1, name: 'Goalkeepers', players, label: 'GK'},
    {id: 2, name: 'Defenders', players, label: 'DF'},
    {id: 3, name: 'Midfielders', players, label: 'MF'},
    {id: 4, name: 'Forwards', players, label: 'FR'},
  ];

  tactics = formations;

  definedSubs = [
    {id: 1, name: 'Match Minutes', isSelected: true},
    {id: 2, name: 'Phase Minutes', isSelected: false}
  ];

  selectedFormation = {};

  constructor() { }

  ngOnInit() {
  }

  selectTactic(tacticFormation) {
    console.log('id', tacticFormation);
    this.selectedFormation = tacticFormation;
  }

  selectDefinedSub(id) {
    console.log('selectDefinedSub', id);
  }

}
