"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counselor = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_model_1 = require("./user.model");
let Counselor = class Counselor {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], Counselor.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, lowercase: true }),
    __metadata("design:type", String)
], Counselor.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, lowercase: true }),
    __metadata("design:type", String)
], Counselor.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Counselor.prototype, "gender", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Counselor.prototype, "age", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Counselor.prototype, "pronouns", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Counselor.prototype, "in_person", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Counselor.prototype, "languages", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Counselor.prototype, "specializations", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Counselor.prototype, "specializationDesc", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Counselor.prototype, "approach", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Counselor.prototype, "approachDesc", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Counselor.prototype, "credentials", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Counselor.prototype, "pfp", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Counselor.prototype, "descriptionLong", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Counselor.prototype, "introduction", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Counselor.prototype, "janeId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Counselor.prototype, "counselling", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Counselor.prototype, "supervising", void 0);
Counselor = __decorate([
    (0, typegoose_1.index)({ user: 1 }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], Counselor);
exports.Counselor = Counselor;
const CounselorModel = (0, typegoose_1.getModelForClass)(Counselor);
exports.default = CounselorModel;
