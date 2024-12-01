import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const team = this.teamRepository.create(createTeamDto);
    try {
      const result = await this.teamRepository.save(team);
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Team: ${createTeamDto.name} is already exists`,
        );
      }
      throw error; // Rethrow for other types of errors
    }
  }

  async findAll() {
    const teams = await this.teamRepository.find();
    return teams;
  }

  async findOne(id: number) {
    const team = await this.teamRepository.findOne({
      where: {
        id,
      },
    });
    if (!team) {
      throw new NotFoundException();
    }
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(id);
    if (!team) {
      throw new NotFoundException();
    }

    Object.assign(team, updateTeamDto);

    return await this.teamRepository.save(team);
  }

  async remove(id: number) {
    const team = await this.findOne(id);

    return await this.teamRepository.remove(team);
  }
}
