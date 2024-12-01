import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ICommonResponse } from 'src/interface/common';
import { TeamEntityObjectEnums } from './team.enum';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
  ): Promise<ICommonResponse<CreateTeamDto, TeamEntityObjectEnums>> {
    const createdTeam = await this.teamService.create(createTeamDto);

    const response: ICommonResponse<CreateTeamDto, TeamEntityObjectEnums> = {
      object: TeamEntityObjectEnums.TEAM,
      data: createdTeam,
      message: 'Team created successfully',
    };
    return response;
  }

  @Get()
  async findAll(): Promise<
    ICommonResponse<CreateTeamDto[], TeamEntityObjectEnums>
  > {
    const result = await this.teamService.findAll();
    const response: ICommonResponse<CreateTeamDto[], TeamEntityObjectEnums> = {
      object: TeamEntityObjectEnums.TEAM_COLLECTION,
      data: result,
    };
    return response;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ICommonResponse<CreateTeamDto, TeamEntityObjectEnums>> {
    const result = await this.teamService.findOne(id);
    const response: ICommonResponse<CreateTeamDto, TeamEntityObjectEnums> = {
      object: TeamEntityObjectEnums.TEAM,
      data: result,
    };
    return response;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
  ): Promise<ICommonResponse<CreateTeamDto, TeamEntityObjectEnums>> {
    const user = await this.teamService.update(id, updateTeamDto);
    const response: ICommonResponse<CreateTeamDto, TeamEntityObjectEnums> = {
      object: TeamEntityObjectEnums.TEAM,
      data: user,
      message: 'Teams updated successfully',
    };
    return response;
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ICommonResponse<CreateTeamDto, TeamEntityObjectEnums>> {
    const result = await this.teamService.remove(id);
    const response: ICommonResponse<CreateTeamDto, TeamEntityObjectEnums> = {
      object: TeamEntityObjectEnums.TEAM,
      data: result,
      message: 'Teams deleted successfully',
    };
    return response;
  }
}
