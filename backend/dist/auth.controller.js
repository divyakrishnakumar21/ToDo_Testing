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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const auth_dto_1 = require("./auth/dto/auth.dto");
let AuthController = class AuthController {
    async deleteUser(body) {
        if (!body.email) {
            return { message: 'Missing email' };
        }
        const deleted = await this.authService.deleteUserByEmail(body.email);
        return { message: deleted ? 'User deleted' : 'User not found' };
    }
    async checkUser(body) {
        if (!body.email) {
            return { exists: false };
        }
        const exists = await this.authService.checkUserExists(body.email);
        return { exists };
    }
    async resetPassword(body) {
        if (!body.email || !body.token || !body.password) {
            return { message: 'Missing required fields' };
        }
        const result = await this.authService.resetPasswordWithToken(body.email, body.token, body.password);
        if (!result) {
            return { message: 'Invalid token or user not found' };
        }
        return { message: 'Password reset successful' };
    }
    constructor(authService) {
        this.authService = authService;
    }
    async signup(authDto) {
        if (!authDto.email || !authDto.password || !authDto.name) {
            return { message: 'Missing required fields' };
        }
        try {
            const user = await this.authService.signup(authDto.name, authDto.email, authDto.password);
            return { message: 'Signup successful', user };
        }
        catch (err) {
            return { message: err.message };
        }
    }
    async login(authDto) {
        if (!authDto.email || !authDto.password) {
            return { message: 'Missing email or password' };
        }
        const user = await this.authService.validateUser(authDto.email, authDto.password);
        if (!user) {
            return { message: 'Password incorrect' };
        }
        return { message: 'Login successful', user };
    }
    async forgotPassword(body) {
        if (!body.email || !body.password) {
            return { message: 'Missing email or new password' };
        }
        const userExists = await this.authService.checkUserExists(body.email);
        if (!userExists) {
            return { message: 'User not found' };
        }
        await this.authService.directResetPassword(body.email, body.password);
        return { message: 'Password reset successful.' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('delete-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by email (for testing only)' }),
    (0, swagger_2.ApiBody)({
        schema: {
            example: {
                email: 'playwrightuser@example.com'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_2.ApiBody)({
        schema: {
            example: {
                email: 'john@example.com'
            }
        }
    }),
    (0, common_1.Post)('check-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user exists by email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkUser", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password using token' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_2.ApiBody)({
        schema: {
            example: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'yourpassword123'
            }
        }
    }),
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'User signup' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, swagger_2.ApiBody)({
        schema: {
            example: {
                email: 'john@example.com',
                password: 'yourpassword123'
            }
        }
    }),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_2.ApiBody)({
        schema: {
            example: {
                email: 'john@example.com',
                password: 'newpassword123'
            }
        }
    }),
    (0, common_1.Post)('forgot-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Forgot password (direct reset)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map