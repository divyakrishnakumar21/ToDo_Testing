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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async signup(name, email, password) {
        const hash = await bcrypt.hash(password, 10);
        const user = new this.userModel({ name, email, password: hash });
        await user.save();
        return user;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        console.log('DEBUG: Found user:', user);
        if (!user)
            return null;
        const passwordMatch = await bcrypt.compare(password, user.password || '');
        console.log('DEBUG: Password match:', passwordMatch);
        if (passwordMatch) {
            return user;
        }
        return null;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user)
            return null;
        return user;
    }
    async getProfile(userId) {
        return this.userModel.findById(userId);
    }
    async updateProfile(userId, name, email) {
        const user = await this.userModel.findById(userId);
        if (user) {
            user.name = name;
            user.email = email;
            await user.save();
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map