import { UserRepo } from './../src/users/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepo: UserRepo;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    userRepo = module.get<UserRepo>(UserRepo);
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  const email = 'fireking5997@gmail.com';
  const newEmail = 'karolos5997@gmail.com';
  const password = '12345';
  const newPassword = '123456';
  const baseTest = () => request(app.getHttpServer()).post('/graphql');
  const publicTest = (query: string) => baseTest().send({ query });
  let token: string;

  describe('register', () => {
    it('return registered user', () => {
      return publicTest(`mutation{
        register(email:"fireking5997@gmail.com",password:"12345",passwordConfirm:"12345"){
          isSuccess,
          user{
            email,
            id
          }
        }
    }`)
        .expect(200)
        .expect((res) => expect(res.body.data.register.user.email).toBe(email));
    });

    it('should throw error ', () => {
      return publicTest(`mutation{
        register(email:"fireking5997@gmail.com",password:"12345",passwordConfirm:"12345"){
          isSuccess,
          user{
            email,
            id
          }
        }
    }`)
        .expect(200)
        .expect((res) => expect(res.body.errors).toEqual(expect.any(Array)));
    });
  });

  describe('login', () => {
    let id: number;
    beforeAll(async () => {
      const [user] = await userRepo.find();
      id = user.id;
    });

    it('should return token', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `mutation{
        login(email:"${email}",password:"${password}"){
          token,
          isSuccess
        }
      }`,
        })
        .expect(200)
        .expect((res) => {
          token = res.body.data.login.token;
          console.log(token);
          return expect(res.body.data.login.token).toEqual(expect.any(String));
        });
    });

    it('should return login fail', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `mutation{
        login(email:"${newEmail}",password:"${password}"){
          token,
          isSuccess
        }
      }`,
        })
        .expect(200)
        .expect((res) => expect(res.body.data).toBe(null))
        .expect((res) => expect(res.body.errors).toEqual(expect.any(Array)));
    });
  });

  describe('update', () => {
    it('should update user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', token)
        .send({
          query: `mutation{
        update(id:1,user:{email:"${newEmail}"}){
          isSuccess,
          user{
            email
          }
        }
      }`,
        })
        .expect(200)
        .expect((res) =>
          expect(res.body.data.update.user.email).toBe(newEmail),
        );
    });

    it('should return error', () => {
      request(app.getHttpServer())
        .post('/graphql')
        .set('authorization', token)
        .send({
          query: `mutation{
        update(id:1,user:{email:"${email}"}){
          isSuccess,
          user{
            email
          }
        }
      }`,
        })
        .expect(200)
        .expect((res) => expect(res.body.data).toBe(null));
    });
  });
});
