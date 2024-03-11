import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GroupService} from "../../state/group.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GroupDto} from "../../state/group.model";
import {AlertDialogComponent} from "../../../alert-dialog/alert-dialog.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {getGroupState, groupStore} from "../../state/group.store";
import {group} from "@angular/animations";
import {filter} from "rxjs";
import {TeamDto} from "../../../teams/state/teams.model";
import {GroupFacade} from "../../group.facade";
import {Merge} from "@ngneat/elf/src/lib/state";


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgIf
  ],
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit{
  groups!: GroupDto[];
  group !: GroupDto | undefined ;
  groupId: string | undefined;
  form !: FormGroup ;



  constructor(
    private groupService: GroupService,
    private groupFacade: GroupFacade,

    private router: Router,
    public dialog: MatDialog,
    private formBuilder :FormBuilder,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.groupId = this.route.snapshot.params['id'];
    this.groups  = getGroupState().groups;
    //this.groups = groupState.groups.map(groupId => groupState.entities[groupId]);

    console.log("groups" , this.groups)

    this.group = this.groups ? this.groups.find(group => group._id === this.groupId) : undefined;
    console.log("group " , group)

    this.form = this.formBuilder.group({
      libelle: [this.group?.libelle || '', Validators.required],
    });

  }



  onSubmit(){
    if (this.form.valid) {
      const libelleGroup = this.form.value.libelle
      this.groupService.addGroup(libelleGroup).subscribe({
          next: (response: GroupDto) => {
            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            this.dialog.open(AlertDialogComponent, {
              data: { message: "l'\ajout de group est échoué" }
            });
          }
        }
      );
    }else {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Le formulaire contient des erreurs.' }
      });
    }
  }
  onEdit(){
    if (this.form.valid) {
      const group= this.form.value
      this.groupFacade.updateGroup(group,this.groupId).subscribe({
          next: (response:GroupDto) => {
            this.router.navigate(['/group/' , this.groupId]);
          },
          error: (error: any) => {
            this.dialog.open(AlertDialogComponent, {
              data: { message: "Modification de team est échoué" }
            });
          }
        }
      );
    }else {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Le formulaire contient des erreurs.' }
      });
    }

  }
  onDelete(groupId :string) {
    this.groupFacade.deleteGroup(groupId).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/home')
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l’équipe', error);
      }
    });
  }


}
