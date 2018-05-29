import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../environments/environment";
import {PlayerAssignation} from "../../models/playerAssignation";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('context') ctx: ElementRef;
  @ViewChild('square') square: ElementRef;
  @Inject(DOCUMENT) document;

  private readonly width: number;
  private readonly height: number;
  public size: number;
  private squareSizeW: number;
  private squareSizeH: number;
  public squareNumber: Array<number> = [];
  private playerTurn = 0;
  public playerOneVictory: boolean;
  public playerTwoVictory: boolean;

  constructor() {
    this.width = environment.gameSpecification.gameWidth;
    this.height = environment.gameSpecification.gameHeight;
    this.size = environment.gameSpecification.gameSize;
    this.squareSizeW = this.width / this.size;
    this.squareSizeH = this.height / this.size;
    for (let i = 0; i < (this.size * this.size); i++) {
      this.squareNumber.push(i);
    }
  }

  /** Method that create the game arena **/
  private create(): void {
    this.ctx.nativeElement.setAttribute('style', 'width:' + this.width + 'px; height:' + this.height + 'px');
  }

  /** Method that check every time a player play, if someone won **/
  private observe(): void {
    this.diagonalCheck();
    this.horizontalCheck();
    this.verticalCheck();
  }

  private horizontalCheck(): void {
    let id = 0;
    for (let y = 0; y < this.size; y++) {
      id = y;
      let counterPlayerOne = 0;
      let counterPlayerTwo = 0;
      for (let i = 0; i < this.size; i++) {
        let element: any = document.getElementById(id.toString());
        element = element.classList;
        for (let node of element) {
          if (node === PlayerAssignation.CLICKED_BY_PLAYER_ONE) {
            counterPlayerOne++;
          } else if (node === PlayerAssignation.CLICKED_BY_PLAYER_TWO) {
            counterPlayerTwo++;
          }
          if (counterPlayerOne === 3) {
            this.playerOneVictory = true;
          }
          if (counterPlayerTwo === 3) {
            this.playerTwoVictory = true;
          }
        }
        id += this.size;
      }
      id = 0;
    }
  }

  private verticalCheck(): void {
    for (let y = 0; y < this.size; y++) {
      let counterPlayerOne = 0;
      let counterPlayerTwo = 0;
      for (let i = 0; i < this.size; i++) {
        let element: any = document.getElementById(i.toString());
        element = element.classList;
        for (let node of element) {
          if (node === PlayerAssignation.CLICKED_BY_PLAYER_ONE) {
            counterPlayerOne++;
          } else if (node === PlayerAssignation.CLICKED_BY_PLAYER_TWO) {
            counterPlayerTwo++;
          }
          if (counterPlayerOne === 3) {
            this.playerOneVictory = true;
          }
          if (counterPlayerTwo === 3) {
            this.playerTwoVictory = true;
          }
        }
      }
    }
  }

  private diagonalCheck(): void {
    let id = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 1) {
        id = 2
      }
      let counterPlayerOne = 0;
      let counterPlayerTwo = 0;
      for (let y = 0; y < this.size; y++) {
        let element: any = document.getElementById(id.toString());
        element = element.classList;
        for (let node of element) {
          if (node === PlayerAssignation.CLICKED_BY_PLAYER_ONE) {
            counterPlayerOne++;
          } else if (node === PlayerAssignation.CLICKED_BY_PLAYER_TWO) {
            counterPlayerTwo++;
          }
          if (counterPlayerOne === 3) {
            this.playerOneVictory = true;
          }
          if (counterPlayerTwo === 3) {
            this.playerTwoVictory = true;
          }
        }
        if (i === 1) {
          id += this.size - 1;
        } else {
          id += this.size + 1;
        }
      }
      id = 0;
    }
  }

  /** Method that pass the turn and use the observe method to determine if their is a winner **/
  public gameObserver(id): number {
    let clickedElement: any = document.getElementById(id.toString());
    let check = true;
    if (this.playerTurn === 0) {
      for (let node of clickedElement.classList) {
        if (node === PlayerAssignation.CLICKED_BY_PLAYER_TWO) {
          check = false;
        }
      }
      if (check) {
        clickedElement.classList.add(PlayerAssignation.CLICKED_BY_PLAYER_ONE);
        this.observe();
        return this.playerTurn++;
      }
    } else {
      for (let node of clickedElement.classList) {
        if (node === PlayerAssignation.CLICKED_BY_PLAYER_ONE) {
          check = false;
        }
      }
      if (check) {
        clickedElement.classList.add(PlayerAssignation.CLICKED_BY_PLAYER_TWO);
        this.observe();
        return this.playerTurn = 0;
      }
    }
  }

  ngOnInit() {
    this.create();
  }

}
