let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);
describe("SHARE VIDEO APP", () => {
  let user = { 
    email: "testlinh@gmail.com",
    password: "123456",
  };
  let falseUser = {
    email: "testlinh@gmail.com",
    password: "1234563543",
  };
  let token;
  beforeEach(() => {
    chai
      .request(server)
      .post("/api/pl/auth/createAndLogin")
      .send(user)
      .end((err, res) => {
        token = res.body.token;
      });
  });
  describe("Interact with video : User ", () => {
    it("can get all video", (done) => {
      chai
        .request(server)
        .get("/api/pl/notifications/viewAll")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
    it("can get all video by a user with token", (done) => {
      chai
        .request(server)
        .get("/api/pv/notifications/viewByUser")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
    it("can share a video ", (done) => {
      chai
        .request(server)
        .post("/api/pv/notifications/create")
        .set("Authorization", token)
        .send({
          url: "https://www.youtube.com/watch?v=Zuigoj-fy2o",
          receiver_by: "linh2@gmail.com",
          created_by: "",
          description: "A description",
          title: "A title",
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.an("object");
          expect(res.body.message).to.equal("create successful");
          done();
        });
    });

    it("can like or dislike a video", (done) => {
      chai
        .request(server)
        .post("/api/pv/notifications/create")
        .set("Authorization", token)
        .send({
          url: "https://www.youtube.com/watch?v=Zuigoj-fy2o",
          receiver_by: "linh2@gmail.com",
          created_by: "",
          description: "A description",
          title: "A title",
        })
        .end((err, res) => {
          chai
            .request(server)
            .post("/api/pv/videos/like/" + res.body.data.video_id)
            .set("Authorization", token)
            .send({
              status: -1,
            })
            .end((err2, res2) => {
              expect(res2.status).to.equal(200);
              expect(res2.body.likes).to.not.equal(undefined);
              expect(res2.body.video_id).to.equal(res.body.data.video_id);
              done();
            });
        });
    });
  });
  describe("Authentication : User ", () => {
    it("can login or register using email and password ", (done) => {
      chai
        .request(server)
        .post("/api/pl/auth/createAndLogin")
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.token).to.not.equal(undefined);
          done();
        });
    });
    it("can not login or register using right email but wrong password ", (done) => {
      chai
        .request(server)
        .post("/api/pl/auth/createAndLogin")
        .send(falseUser)
        .end((err, res) => {
          expect(res.body.errors).to.equal("Wrong password");
          done();
        });
    });
  });
});
